// Example of using useRouter in a component
import { useRouter } from 'next/router';

export default function GenericRouter() {
  const router = useRouter();

  // Example of using router object
  const handleClick = () => {
    router.push('/');
  };

  return (
    <div>
      <p>Current route: {router.pathname}</p>
      <button onClick={handleClick}>Go to Another Page</button>
    </div>
  );
}
