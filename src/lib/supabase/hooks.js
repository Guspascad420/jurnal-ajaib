import { useState, useEffect } from 'react';
import { getStudentBooks } from './books';
import { getStudentById, getStudentWithCompletedBooks } from './students';
import { supabase } from '../supabaseClient';

const hasUpdatedToday = (lastUpdated) => {
  if (!lastUpdated) return false;
  
  const lastUpdateDate = new Date(lastUpdated);
  const today = new Date();
  
  return (
    lastUpdateDate.getDate() === today.getDate() &&
    lastUpdateDate.getMonth() === today.getMonth() &&
    lastUpdateDate.getFullYear() === today.getFullYear()
  );
};

export function useStudentBooks(studentId) {
  const [result, setResult] = useState({
    student: {},
    hasUpdatedToday: false,
    books: [],
    stats: {
      total: 0,
      completed: 0,
      reading: 0,
      completionPercentage: 0
    },
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!studentId) return;

    const loadBooks = async () => {
      try {
        const { student, books, stats } = await getStudentBooks(studentId);
        setResult({
          student,
          books,
          stats,
          hasUpdatedToday: hasUpdatedToday(books[0].last_updated) ? true : false,
          loading: false,
          error: null
        });
      } catch (error) {
        setResult(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    loadBooks();
  }, [studentId]);
  return result;
}

export function useStudents() {
  const [state, setState] = useState({
    students: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        
        const { data, error } = await supabase
          .from('students')
          .select('*')

        if (error) throw error;

        setState({
          students: data || [],
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          students: [],
          loading: false,
          error: error.message
        });
      }
    };

    loadStudents();
  }, []);

  return state;
}

export function useStudentWithCompletedBooks(studentId) {
  const [data, setData] = useState({
    student: null,
    completedBooks: [],
    stats: { total_completed: 0, total_pages_read: 0 },
    loading: true,
    error: null
  });

  useEffect(() => {
    if (!studentId) return;

    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true }));
        const result = await getStudentWithCompletedBooks(studentId);
        setData({
          ...result,
          loading: false,
          error: null
        });
      } catch (error) {
        setData({
          student: null,
          completedBooks: [],
          stats: { total_completed: 0, total_pages_read: 0 },
          loading: false,
          error: error.message
        });
      }
    };

    fetchData();
  }, [studentId]);

  return data;
}

export function useAddStudentBook() {
  const [state, setState] = useState({
    loading: false,
    error: null,
    addedBook: null,
    addedStudentBook: null
  });

  const addStudentBook = async (studentId, title, total_pages) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data: book, error: bookError } = await supabase
        .from('books')
        .insert([{
          title: title.trim(),
          total_pages: Math.floor(total_pages)
        }])
        .select()
        .single();

      if (bookError) throw bookError;

      const { data: studentBook, error: studentBookError } = await supabase
        .from('student_books')
        .insert([{
          student_id: studentId,
          book_id: book.id,
          current_page: 0,
          status: 'reading',
          start_date: new Date().toISOString()
        }])
        .select()
        .single();

      if (studentBookError) throw studentBookError;

      setState({
        loading: false,
        error: null,
        addedBook: book,
        addedStudentBook: studentBook
      });

      return { book, studentBook };
    } catch (error) {
      const errorMsg = error.message || 'Failed to add book';
      console.error('Error adding student book:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMsg
      }));
      return null;
    }
  };

  return {
    ...state,
    addStudentBook
  };
}