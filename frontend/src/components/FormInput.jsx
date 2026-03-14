export default function FormInput({ label, ...props }) {
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="mb-1 font-medium">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6bb4a2]"
      />
    </div>
  );
}
