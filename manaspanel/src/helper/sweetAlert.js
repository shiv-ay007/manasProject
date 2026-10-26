import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/**
 * Premium Modern SweetAlert2 Toast
 * Usage:
 *   showToast({ icon: 'success', title: 'Login Successful!' })
 *   showToast({ icon: 'error', title: 'Invalid credentials' })
 */
export const showToast = ({
  icon = 'success',
  title = '',
  position = 'top-end',
  timer = 3000,
} = {}) => {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    showCloseButton: true,
    background: '#ffffff',
    color: '#1e293b',
    iconColor: icon === 'success' ? '#10b981' : icon === 'error' ? '#ef4444' : '#3b82f6',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
    customClass: {
      popup: 'shadow-2xl rounded-xl border border-slate-200/80 font-sans text-sm',
    },
  });

  return Toast.fire({
    icon,
    title,
  });
};

/**
 * Modern Confirm Delete Dialog
 * Usage:
 *   const confirmed = await confirmDelete({
 *     title: 'Are you sure?',
 *     text: 'You want to delete this record.',
 *   });
 */
export const confirmDelete = async ({
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  confirmButtonText = 'Yes, Delete',
  cancelButtonText = 'Cancel',
} = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e11d48', // rose-600
    cancelButtonColor: '#64748b', // slate-500
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    focusCancel: true,
    customClass: {
      popup: 'rounded-2xl border border-slate-200 shadow-2xl p-6 font-sans',
      title: 'text-lg font-bold text-slate-800',
      htmlContainer: 'text-sm text-slate-600',
      confirmButton: 'px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md',
      cancelButton: 'px-5 py-2.5 rounded-lg text-sm font-semibold',
    },
  });

  return result.isConfirmed;
};

/**
 * Modern Generic Confirm Action (e.g. Logout, Status change)
 */
export const confirmAction = async ({
  title = 'Are you sure?',
  text = '',
  icon = 'question',
  confirmButtonText = 'Yes, Proceed',
  cancelButtonText = 'Cancel',
  confirmButtonColor = '#0d9488', // teal-600
} = {}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor: '#64748b',
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    customClass: {
      popup: 'rounded-2xl border border-slate-200 shadow-2xl p-6 font-sans',
      title: 'text-lg font-bold text-slate-800',
      htmlContainer: 'text-sm text-slate-600',
      confirmButton: 'px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md',
      cancelButton: 'px-5 py-2.5 rounded-lg text-sm font-semibold',
    },
  });

  return result.isConfirmed;
};

/**
 * Modern Alert (Replacement for window.alert)
 */
export const showAlert = ({
  icon = 'info',
  title = '',
  text = '',
  confirmButtonColor = '#0d9488',
} = {}) => {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor,
    customClass: {
      popup: 'rounded-2xl border border-slate-200 shadow-2xl p-6 font-sans',
      title: 'text-lg font-bold text-slate-800',
      htmlContainer: 'text-sm text-slate-600',
      confirmButton: 'px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md',
    },
  });
};

export default Swal;
