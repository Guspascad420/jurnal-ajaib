import { supabase } from "../supabaseClient";

/**
 * Fetches a student and their completed books
 * @param {string} studentId - The student's UUID
 * @returns {Promise<{student: Object, completedBooks: Array}>}
 */
export async function getStudentWithCompletedBooks(studentId) {
  try {
    // 1. First fetch the student
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();

    if (studentError) throw studentError;
    if (!studentData) throw new Error('Student not found');

    // 2. Then fetch their completed books
    const { data: booksData, error: booksError } = await supabase
      .from('student_books')
      .select(`
        current_page,
        start_date,
        end_date,
        books (*)
      `)
      .eq('student_id', studentId)
      .eq('status', 'completed')
      .order('end_date', { ascending: false }); // Newest completed first

    if (booksError) throw booksError;

    // 3. Transform the books data
    const completedBooks = booksData.map(record => ({
      ...record.books,
      reading_data: {
        current_page: record.current_page,
        start_date: record.start_date,
        end_date: record.end_date,
        progress: 100 // Since they're completed
      }
    }));

    return {
      student: studentData,
      completedBooks,
      stats: {
        total_completed: completedBooks.length,
        total_pages_read: completedBooks.reduce((sum, book) => sum + book.total_pages, 0)
      }
    };
  } catch (error) {
    console.error('Error fetching student with completed books:', error);
    throw error;
  }
}