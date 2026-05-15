import { supabase } from "../../src/Supabase/Client";

  const toDbProject = (project: any, userId?: string) => ({
      ...(userId && { user_id: userId }),

      title: project.title,
      description: project.description,

      github_url: project.githubUrl,
      live_url: project.liveUrl,

      technologies: project.technologies,

      is_primary: project.isPrimary,
    });
    const fromDbProject = (project: any) => ({
      id: project.id,

      title: project.title,
      description: project.description,

      githubUrl: project.github_url,
      liveUrl: project.live_url,

      technologies: project.technologies,

      isPrimary: project.is_primary,
    });

export const onboardingApi = {
  // --------------------------------
  // FETCH STEP DATA
  // --------------------------------

  async fetchStepData(step: number, userId: string) {
    // STEP 1 → PROFILE
    if (step === 1) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      return {
        success: true,
        data,
      };
    }

  

    // STEP 2 → PROJECTS
    if (step === 2) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return {
        success: true,
       data: data.map(fromDbProject),
      };
    }

    return {
      success: true,
      data: {},
    };
  },
  

  // --------------------------------
  // SAVE STEP DATA
  // --------------------------------

  async saveStepData(step: number, userId: string, payload: any) {
    // STEP 1 → PROFILE
    if (step === 1) {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: payload.fullName,
          gender: payload.gender,
          university: payload.university,
          branch: payload.branch,
          course: payload.course,
          year: payload.year,
        })
        .eq("id", userId);

      if (error) throw error;

      return {
        success: true,
      };
    }

    // STEP 2 → PROJECTS
    if (step === 2) {
      const projects = payload;

      // OPTIONAL:
      // delete old projects first

      /* await supabase
        .from("projects")
        .delete()
        .eq("user_id", userId);*/

      const formattedProjects = projects.map((project: any) => ({
        user_id: userId,

        title: project.title,
        description: project.description,

        github_url: project.githubUrl,
        live_url: project.liveUrl,

        technologies: project.technologies,

        is_primary: project.isPrimary,
      }));

      const { error } = await supabase
        .from("projects")
        .insert(formattedProjects);

      if (error) throw error;

      return {
        success: true,
      };
    }

    return {
      success: true,
    };
  },

  async addProject(userId: string, project: any) {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        user_id: userId,
        title: project.title,
        description: project.description,
        github_url: project.githubUrl,
        live_url: project.liveUrl,
        technologies: project.technologies,
        is_primary: project.isPrimary,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return fromDbProject(data);
  },

  async deleteProject(projectId: string) {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      throw error;
    }

    return true;
  },

  async updateProject(projectId: string, project: any) {
    const { data, error } = await supabase
      .from("projects")
      .update({
        title: project.title,
        description: project.description,
        github_url: project.githubUrl,
        live_url: project.liveUrl,
        technologies: project.technologies,
        is_primary: project.isPrimary,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return fromDbProject(data);
  },

  // --------------------------------
  // FETCH PROGRESS
  // --------------------------------

  async fetchProgress(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("onboarding_progress")
      .eq("id", userId)
      .single();

    if (error) throw error;

    return {
      currentStep: data.onboarding_progress,
    };
  },
};
