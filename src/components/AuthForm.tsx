// import React from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { Button, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

// interface AuthFormProps {
//   isSignup: boolean;
//   onSubmit: SubmitHandler<AuthFormInputs>;
// }

// interface AuthFormInputs {
//   username: string;
//   password: string;
//   confirmPassword?: string;
// }

// const AuthForm: React.FC<AuthFormProps> = ({ isSignup, onSubmit }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch
//   } = useForm<AuthFormInputs>();

//   const password = watch('password', '');

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
//       <FormControl isInvalid={!!errors.username} className="mb-4">
//         <FormLabel htmlFor="username">Username</FormLabel>
//         <Input
//           id="username"
//           type="text"
//           placeholder="Username"
//           {...register('username', { required: 'Username is required' })}
//           className="w-full"
//         />
//         <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
//       </FormControl>

//       <FormControl isInvalid={!!errors.password} className="mb-4">
//         <FormLabel htmlFor="password">Password</FormLabel>
//         <Input
//           id="password"
//           type="password"
//           placeholder="Password"
//           {...register('password', { required: 'Password is required' })}
//           className="w-full"
//         />
//         <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
//       </FormControl>

//       {isSignup && (
//         <FormControl isInvalid={!!errors.confirmPassword} className="mb-4">
//           <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
//           <Input
//             id="confirmPassword"
//             type="password"
//             placeholder="Confirm Password"
//             {...register('confirmPassword', {
//               validate: value => value === password || 'Passwords do not match'
//             })}
//             className="w-full"
//           />
//           <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
//         </FormControl>
//       )}

//       <Button type="submit" colorScheme="teal" className="w-full mt-4">
//         {isSignup ? 'Sign Up' : 'Log In'}
//       </Button>
//     </form>
//   );
// };

// export default AuthForm;
