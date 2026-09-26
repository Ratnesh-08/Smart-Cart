/**
 * js/feedback.js
 * Smart Cart AI — Customer Feedback operations via Supabase
 *
 * Schema table used:
 *   feedback(id, user_id, order_id, rating, comment, created_at)
 *
 * Constraints & RLS:
 *   - rating must be between 1 and 5 (enforced by CHECK constraint)
 *   - order_id is UNIQUE (one feedback per order)
 *   - Customers can insert & view their own feedback
 *   - Admins can view all feedback
 */

import { supabaseClient, getCurrentUser } from './supabase-client.js';

/**
 * Submit feedback for a completed order.
 * @param {string} orderId - UUID of the completed order
 * @param {number} rating  - Integer between 1 and 5
 * @param {string} [comment=''] - Optional feedback comment
 * @returns {Promise<{feedback, error}>}
 */
export async function submitFeedback(orderId, rating, comment = '') {
  const user = await getCurrentUser();
  if (!user) return { feedback: null, error: new Error('Not authenticated') };

  const parsedRating = parseInt(rating, 10);
  if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return { feedback: null, error: new Error('Rating must be an integer between 1 and 5') };
  }

  const { data, error } = await supabaseClient
    .from('feedback')
    .insert({
      user_id:  user.id,
      order_id: orderId,
      rating:   parsedRating,
      comment:  comment?.trim() || null,
    })
    .select()
    .single();

  return { feedback: data, error };
}

/**
 * Fetch feedback for a specific order.
 * @param {string} orderId
 * @returns {Promise<{feedback, error}>}
 */
export async function getFeedbackByOrderId(orderId) {
  const { data, error } = await supabaseClient
    .from('feedback')
    .select('id, user_id, order_id, rating, comment, created_at')
    .eq('order_id', orderId)
    .maybeSingle();

  return { feedback: data, error };
}

/**
 * Fetch all feedback submitted by the current user.
 * @returns {Promise<{feedbackList: Array, error}>}
 */
export async function getUserFeedback() {
  const user = await getCurrentUser();
  if (!user) return { feedbackList: [], error: new Error('Not authenticated') };

  const { data, error } = await supabaseClient
    .from('feedback')
    .select(`
      id,
      order_id,
      rating,
      comment,
      created_at,
      orders ( order_number, total_amount )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return { feedbackList: data ?? [], error };
}

/**
 * Fetch all feedback across the store (Admin only).
 * @returns {Promise<{feedbackList: Array, error}>}
 */
export async function getAllFeedback() {
  const { data, error } = await supabaseClient
    .from('feedback')
    .select(`
      id,
      rating,
      comment,
      created_at,
      orders ( order_number, total_amount ),
      profiles ( full_name, phone )
    `)
    .order('created_at', { ascending: false });

  return { feedbackList: data ?? [], error };
}
