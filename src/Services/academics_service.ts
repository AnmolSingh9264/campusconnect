import { supabase } from "../Supabase/Client";
import type {
  University,
  Course,
  Branch,
} from "../Types/academics";

export const academicService = {
  async getUniversities(): Promise<University[]> {
    const { data, error } = await supabase
      .from("universities")
      .select("id, name")
      .order("name");

    if (error) throw error;

    return data;
  },

  async getCourses(universityId: string): Promise<Course[]> {
    const { data, error } = await supabase
      .from("university_courses")
      .select(`
        course:courses (
          id,
          name,
          duration
        )
      `)
      .eq("university_id", universityId);

    if (error) throw error;

    return data.map((item: any) => item.course);
  },

  async getBranches(
    courseId: string
  ): Promise<Branch[]> {
    const { data, error } = await supabase
      .from("course_branches")
      .select(`
        branch:branches (
          id,
          name
        )
      `)
      .eq("course_id", courseId);

    if (error) throw error;

    return data.map((item: any) => item.branch);
  },
};