import { useState } from 'react';
import { supabase } from '../../supabase';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    dni: '',
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
            created_at: new Date(),
            updated_at: new Date(),
          },
        ])
        .select();

      if (userError) throw userError;
      if (!userData || userData.length === 0) {
        throw new Error(
          'No se pudieron recuperar los datos del usuario insertado.'
        );
      }

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
            patient_email: formData.email,
            patient_medical_history: formData.patient_medical_history,
            patient_dni: formData.dni,
            patient_user_id: user_id,
            patient_created_at: new Date(),
            patient_updated_at: new Date(),
          },
        ]);
      if (patientError) throw patientError;

      alert('Paciente registrado exitosamente!');
      navigate('/');
    } catch (error) {
      console.error('Error registrando el paciente:', error);
      alert('Error registrando el paciente');
    }
  };

  return (
    <div className='h-screen relative'>
      <NavBar message={'Salir'} />
      <form
        onSubmit={handleSubmit}
        className='max-w-xl mx-auto flex-grow p-4 mt-8 bg-zinc-100 rounded-lg shadow-lg'
      >
        <h1 className='text-2xl mb-4'>Registro de Paciente</h1>

        <div className='flex w-full justify-between'>
          <div className='mb-4 w-1/2'>
            <label
              className='block mb-1'
              htmlFor='patient_first_name'
            >
              Nombre/s
            </label>
            <input
              type='text'
              id='patient_first_name'
              name='patient_first_name'
              placeholder='John'
              value={formData.patient_first_name}
              onChange={handleChange}
              className='w-full border px-2 py-1'
              required
            />
          </div>

          <div className='mx-4 w-1/2'>
            <label
              className='block mb-1'
              htmlFor='patient_last_name'
            >
              Apellido/s
            </label>
            <input
              type='text'
              id='patient_last_name'
              name='patient_last_name'
              placeholder='Doe'
              value={formData.patient_last_name}
              onChange={handleChange}
              className='w-full border px-2 py-1'
              required
            />
          </div>
        </div>

        <div className='flex w-full justify-between'>
          <div className='mb-4 w-1/2'>
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
              placeholder='john@example.com'
              value={formData.email}
              onChange={handleChange}
              className='w-full border px-2 py-1'
              required
            />
          </div>
          <div className='mx-4 w-1/2'>
            <label
              className='block mb-1'
              htmlFor='patient_phone'
            >
              Teléfono
            </label>
            <input
              type='number'
              id='patient_phone'
              name='patient_phone'
              placeholder='123456789'
              value={formData.patient_phone}
              onChange={handleChange}
              className='w-full border px-2 py-1'
              required
            />
          </div>
        </div>

        <div className='flex w-full justify-between'>
          <div className='mb-4 w-1/2'>
            <label
              className='block mb-1'
              htmlFor='username'
            >
              Usuario
            </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='john_doe'
              value={formData.username}
              onChange={handleChange}
              className='w-full border px-2 py-1'
              required
            />
          </div>

          <div className='mx-4 w-1/2'>
            <label
              className='block mb-1'
              htmlFor='password'
            >
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='********'
              value={formData.password}
              onChange={handleChange}
              className='w-full border px-2 py-1'
              required
            />
          </div>
        </div>
        <div className='flex w-full justify-between'>
          <div className='mb-4 w-10/12'>
            <label
              className='block mb-1'
              htmlFor='dni'
            >
              DNI
            </label>
            <input
              type='number'
              id='dni'
              name='dni'
              placeholder='12345678'
              value={formData.dni}
              onChange={handleChange}
              className='w-full border px-2 py-1'
              required
            />
          </div>
        </div>

        <div className='mb-4'>
          <label
            className='block mb-1'
            htmlFor='patient_date_of_birth'
          >
            Fecha de Nacimiento
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
            htmlFor='patient_medical_history'
          >
            Historial Medico
          </label>
          <textarea
            id='patient_medical_history'
            name='patient_medical_history'
            placeholder='Escriba su historial medico...'
            value={formData.patient_medical_history}
            onChange={handleChange}
            className='w-full border px-2 py-1'
            required
          ></textarea>
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='w-9/12 text-center bg-blue-500 text-white py-2 rounded-md'
          >
            Register
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default RegisterPage;
