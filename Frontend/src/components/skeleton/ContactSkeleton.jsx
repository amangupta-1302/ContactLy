const ContactSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <tr key={idx} className="animate-pulse">
          <td>
            <div className="h-4 bg-gray-600 rounded w-24 mx-auto my-2"></div>
          </td>
          <td>
            <div className="h-4 bg-gray-600 rounded w-20 mx-auto my-2"></div>
          </td>
          <td>
            <div className="h-4 bg-gray-600 rounded w-32 mx-auto my-2"></div>
          </td>
          <td>
            <div className="flex justify-center gap-2">
              <div className="h-8 w-16 bg-gray-600 rounded"></div>
              <div className="h-8 w-16 bg-gray-600 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ContactSkeleton;
