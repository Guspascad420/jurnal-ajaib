import { supabase } from '../supabaseClient';

export async function getStudentBooks(studentId) {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
          *,
          student_books (
            status,
            current_page,
            start_date,
            pages_read_today,
            end_date,
            last_updated,
            books (
              id,
              title,
              total_pages
            )
          )
        `)
      .eq('id', studentId)
      .in('student_books.status', ['completed', 'reading'])
      .order('last_updated', { 
        referencedTable: 'student_books', 
        ascending: false 
      })
      .single();  // Since we're querying a single student

    if (error) throw error;
    if (!data) throw new Error('Student not found');

    // Process the books data
    const allBooks = data.student_books.map(item => ({
      ...item.books,
      status: item.status,
      current_page: item.current_page,
      pages_read_today: item.pages_read_today,
      progress: Math.round((item.current_page / item.books.total_pages) * 100),
      start_date: item.start_date,
      end_date: item.end_date,
      last_updated: item.last_updated,
      is_completed: item.status === 'completed'
    }));

    return {
      student: data,
      books: allBooks,
      stats: {
        total: allBooks.length,
        completed: allBooks.filter(b => b.is_completed).length,
        reading: allBooks.filter(b => !b.is_completed).length,
        total_pages_read: allBooks.reduce((sum, book) => sum + book.current_page, 0)
      }
    };
  } catch (error) {
    console.error('Error fetching student with books:', error);
    throw error;
  }
}