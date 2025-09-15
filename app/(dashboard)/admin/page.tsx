'use server';
import { redirect } from 'next/navigation'

const AdminPage = () => {
  return redirect('/admin/systemUsers');
}

export default AdminPage