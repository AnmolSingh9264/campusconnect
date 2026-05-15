import { createContext, useContext, useEffect, useState } from "react";

import { onboardingApi } from "../Services/onboardingApi";
import { useAuth } from "./AuthContext";

// --------------------------------
// TYPES
// --------------------------------

export type OnboardingStep = 1 | 2 | 3 | 4;

type OnboardingData = {
  basicInfo?: any;
  projectInfo?: any;
  careerGoals?: any;
  skills?: any;
};

type ContextType = {
  currentStep: OnboardingStep;
  progress: number;
  loading: boolean;

  onboardingData: OnboardingData;

  nextStep: () => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  prevStep: () => Promise<void>;
  insertProject: (project: any) => Promise<void>;
  updateProject: (id: string, project: any) => Promise<void>;
  goToStep: (step: OnboardingStep) => Promise<void>;

  updateData: (key: keyof OnboardingData, value: any) => void;

  refreshStepData: () => Promise<void>;
};

// --------------------------------
// CONTEXT
// --------------------------------

const OnboardingContext = createContext<ContextType | undefined>(undefined);

// --------------------------------
// PROVIDER
// --------------------------------

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, loading: authLoading, updateProgress, updateUser } = useAuth();

  // --------------------------------
  // STATE
  // --------------------------------

  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);

  const [loading, setLoading] = useState(false);

  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  // --------------------------------
  // PROGRESS
  // --------------------------------

  const [progress, setProgress] = useState(0);

  // --------------------------------
  // CONVERT PROGRESS -> STEP
  // --------------------------------

  const getStepFromProgress = (progress: number): OnboardingStep => {
    if (progress >= 100) return 4;
    if (progress >= 75) return 3;
    if (progress >= 50) return 2;
    return 1;
  };

  // --------------------------------
  // LOAD USER PROGRESS
  // --------------------------------

  useEffect(() => {
    if (authLoading) return;

    const progress = user?.user_metadata?.progress ?? 0;

    const step = getStepFromProgress(progress);
    setProgress(progress);

    setCurrentStep(step);
  }, [user, authLoading]);

  // --------------------------------
  // LOAD STEP DATA
  // --------------------------------
  

  const loadStepData = async (step: OnboardingStep) => {
    setLoading(true);

    try {
      const res: any = await fetchStepData(step, user);

      switch (step) {
        case 1:
          setOnboardingData((prev) => ({
            ...prev,
            basicInfo: res.data,
          }));
          break;

        case 2:
          setOnboardingData((prev) => ({
            ...prev,
            projectInfo: res.data,
          }));
          break;

        case 3:
          setOnboardingData((prev) => ({
            ...prev,
            careerGoals: res.data,
          }));
          break;

        case 4:
          setOnboardingData((prev) => ({
            ...prev,
            skills: res.data,
          }));
          break;
      }
    } catch (err) {
      console.error("Failed loading onboarding data:", err);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // FETCH WHEN STEP CHANGES
  // --------------------------------

  useEffect(() => {
    if (authLoading || !user) return;

    loadStepData(currentStep);
  }, [currentStep, user, authLoading]);

  // --------------------------------
  // REFRESH CURRENT STEP
  // --------------------------------

  const refreshStepData = async () => {
    await loadStepData(currentStep);
  };

  // --------------------------------
  // UPDATE LOCAL DATA
  // --------------------------------

  const updateData = (key: keyof OnboardingData, value: any) => {
    setOnboardingData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // --------------------------------
  // GET CURRENT PAYLOAD
  // --------------------------------

  const getCurrentPayload = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.basicInfo;

      case 2:
        return onboardingData.projectInfo;

      case 3:
        return onboardingData.careerGoals;

      case 4:
        return onboardingData.skills;

      default:
        return null;
    }
  };

  // --------------------------------
  // SAVE CURRENT STEP
  // --------------------------------

  const saveCurrentStep = async () => {
    try {
      const payload = getCurrentPayload();

      if (currentStep == 1) {
        await updateUser(
          payload.fullname,
          payload.gender,
          payload.university,
          payload.course,
          payload.branch,
          payload.year,
        );
      } else if (currentStep === 2) {
        if (!user) {
          return;
        }
        await onboardingApi.saveStepData(2, user.id, payload);
      }

      // await onboardingApi.saveStepData(currentStep, payload);
    } catch (err) {
      console.error("Failed saving onboarding step:", err);
    }
  };

  // --------------------------------
  // UPDATE STEP + PROGRESS
  // --------------------------------

  const setStepAndProgress = async (step: OnboardingStep) => {
    setCurrentStep(step);

    const nextProgress =
      step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;

    try {
      await updateProgress(nextProgress);

      setProgress(nextProgress);
    } catch (err) {
      console.error("Failed updating onboarding progress:", err);
    }
  };

  // --------------------------------
  // NAVIGATION
  // --------------------------------

  const nextStep = async () => {
    await saveCurrentStep();

    const next = Math.min(currentStep + 1, 4) as OnboardingStep;

    await setStepAndProgress(next);
  };

  const prevStep = async () => {
    await saveCurrentStep();

    const prev = Math.max(currentStep - 1, 1) as OnboardingStep;

    await setStepAndProgress(prev);
  };

  const goToStep = async (step: OnboardingStep) => {
    await saveCurrentStep();

    await setStepAndProgress(step);
  };

  const deleteProject = async (id: string) => {
  try {
    await onboardingApi.deleteProject(id);

    const updatedProjects =
      onboardingData.projectInfo?.filter((p: any) => p.id !== id) || [];

    updateData("projectInfo", updatedProjects);
  } catch (err) {
    console.error("Failed deleting project:", err);
  }
};
const insertProject = async (project: any) => {
  try {
    // -----------------------------
    // INSERT INTO DATABASE
    // -----------------------------
    if(!user){
        return;
    }

    const savedProject = await onboardingApi.addProject(user.id, project);

    // -----------------------------
    // UPDATE LOCAL CONTEXT
    // -----------------------------

    const updatedProjects = [
      ...(onboardingData.projectInfo || []),
      savedProject,
    ];

    updateData("projectInfo", updatedProjects);
  } catch (err) {
    console.error("Failed inserting project:", err);
    throw err;
  }
};

const updateProject = async (projectId: string, project: any) => {
  try {
    await onboardingApi.updateProject(projectId,project);

    const updatedProjects =
      onboardingData.projectInfo?.map((p: any) =>
        p.id === project.id ? project : p
      ) || [];

    updateData("projectInfo", updatedProjects);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

  // --------------------------------
  // PROVIDER
  // --------------------------------

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        progress,
        loading,
        onboardingData,
        insertProject,
        updateProject,
        nextStep,
        prevStep,
        goToStep,
        deleteProject,
        updateData,
        refreshStepData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// --------------------------------
// HOOK
// --------------------------------

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used inside provider");
  }

  return context;
};

async function fetchStepData(step: number, user: any): Promise<any> {
  const meta = user.user_metadata;

  switch (step) {
    case 1:
      return {
        data: {
          fullName: meta.full_name || "",
          email: user.email || "",
          gender: meta.gender || "",
          university: meta.university || "",
          branch: meta.branch || "",
          course: meta.course || "",
          year: meta.year || "",
        },
      };

    case 2:
      const res = await onboardingApi.fetchStepData(step, user.id);

      console.log(res);
      

      return {
        data: res.data,
      };

    case 3:
      return {
        data: {},
      };

    case 4:
      return {
        data: {},
      };

    default:
      return {
        data: null,
      };
  }
}
