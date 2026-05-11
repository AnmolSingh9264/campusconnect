import { useEffect, useState } from "react";
import { academicService } from "../../Services/academics_service";
import type { University, Course, Branch } from "../../Types/academics";

export const useUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);

      try {
        const data = await academicService.getUniversities();
        setUniversities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return {
    universities,
    loading,
  };
};

export const UniversityById = (id:string) => {
  const [universityById, setUniversity] = useState<University | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUniversities = async () => {
      setLoading(true);

      try {
        const data = await academicService.getUniversityById(id);
        setUniversity(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return {
    universityById,
    loading,
  };
};

export const useCourses = (universityId: string) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!universityId) return;

    const fetchCourses = async () => {
      try {
        const data = await academicService.getCourses(universityId);
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, [universityId]);

  return { courses };
};

export const useBranches = (
  courseId: string
) => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    if (!courseId) return;

    const fetchBranches = async () => {
      try {
        const data = await academicService.getBranches(
          courseId,
        );

        setBranches(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBranches();
  }, [ courseId]);

  return { branches };
};