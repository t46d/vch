import SignupForm from './SignupForm';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          إنشاء حساب جديد
        </h2>
        <SignupForm />
      </div>
    </div>
  );
}
