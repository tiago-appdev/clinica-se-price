import { useState } from 'react';
import { supabase } from '../../supabase';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'patient',
    patient_first_name: '',
    patient_last_name: '',
    patient_date_of_birth: '',
    patient_phone: '',
    patient_email: '',
    patient_medical_history: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Insertar en la tabla users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            role: formData.role,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);

      if (userError) throw userError;

      const user_id = userData[0].user_id;

      // Insertar en la tabla patients
      // eslint-disable-next-line no-unused-vars
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .insert([
          {
            patient_first_name: formData.patient_first_name,
            patient_last_name: formData.patient_last_name,
            patient_date_of_birth: formData.patient_date_of_birth,
            patient_phone: formData.patient_phone,
            patient_email: formData.patient_email,
            patient_medical_history: formData.patient_medical_history,
            user_id: user_id,
            patient_createdAt: new Date(),
            patient_updatedAt: new Date(),
          },
        ]);

      if (patientError) throw patientError;

      alert('Paciente registrado exitosamente!');
    } catch (error) {
      console.error('Error registrando el paciente:', error);
      alert('Error registrando el paciente');
    }
  };

  return (
    <>
      <NavBar message={'Salir'} />
      <form
        onSubmit={handleSubmit}
        className='max-w-md mx-auto p-4'
      >
        <h1 className='text-2xl mb-4'>Registro de Paciente</h1>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='username'
          >
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='password'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='patient_first_name'
          >
            First Name
          </label>
          <input
            type='text'
            id='patient_first_name'
            name='patient_first_name'
            value={formData.patient_first_name}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='patient_last_name'
          >
            Last Name
          </label>
          <input
            type='text'
            id='patient_last_name'
            name='patient_last_name'
            value={formData.patient_last_name}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='patient_date_of_birth'
          >
            Date of Birth
          </label>
          <input
            type='date'
            id='patient_date_of_birth'
            name='patient_date_of_birth'
            value={formData.patient_date_of_birth}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='patient_phone'
          >
            Phone
          </label>
          <input
            type='text'
            id='patient_phone'
            name='patient_phone'
            value={formData.patient_phone}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='patient_email'
          >
            Patient Email
          </label>
          <input
            type='email'
            id='patient_email'
            name='patient_email'
            value={formData.patient_email}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          />
        </div>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='patient_medical_history'
          >
            Medical History
          </label>
          <textarea
            id='patient_medical_history'
            name='patient_medical_history'
            value={formData.patient_medical_history}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          ></textarea>
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2'
        >
          Register
        </button>
      </form>
      <Footer />
    </>
  );
};

export default RegisterPage;
