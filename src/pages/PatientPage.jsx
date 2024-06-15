import { NavBar, Footer } from '../components';

const PatientPage = () => {
  return (
    <div className='h-screen w-full relative'>
      <NavBar message='Logout' />
      <div className='max-w-4xl mx-auto p-4'>
        <h2 className='text-2xl font-bold mb-4'>Detalles del Paciente</h2>
        <div className='bg-white shadow-md rounded-lg p-6'>
          <div className='mb-4'>
            <h3 className='text-lg font-semibold'>Datos del Turno</h3>
            <p>N° Ficha: 22784</p>
            <p>Paciente: MARTÍNEZ, SOFÍA</p>
            <p>Fecha/Hora: 03/06/2024 - 14:00</p>
            <p>Profesional: RODRÍGUEZ, CARLOS</p>
            <p>Servicio: CONSULTA OFTALMOLÓGICA</p>
            <p>Teléfono: 6532-564249</p>
          </div>
          <div className='mb-4'>
            <h3 className='text-lg font-semibold'>Estado</h3>
            <p>REALIZADO</p>
          </div>
          <div className='mb-4'>
            <h3 className='text-lg font-semibold'>Informe del Paciente</h3>
            <p>
              AGUDEZA VISUAL:
              <br />
              SIN CORRECCIÓN: OD 20/40, OI 20/30.
              <br />
              CON CORRECCIÓN: OD 20/20, OI 20/20.
              <br />
              REFLEJOS PUPILARES: SIMÉTRICOS Y REACTIVOS.
              <br />
              MOVIMIENTOS OCULARES: NORMALES EN TODAS LAS DIRECCIONES.
              <br />
              FONDO DE OJO: RETINA SIN ALTERACIONES.
              <br />
              PRESIÓN INTRAOCULAR: OD 15 MMHG, OI 16 MMHG.
            </p>
          </div>
          <div className='flex items-center mb-4'>
            <input
              type='checkbox'
              id='sendByEmail'
              className='mr-2'
            />
            <label htmlFor='sendByEmail'>Enviar Informe por Mail</label>
            <input
              type='email'
              placeholder='sofia_m25@hotmail.com'
              className='ml-4 p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='sendAttachments'
              className='mr-2'
            />
            <label htmlFor='sendAttachments'>Enviar Archivos Adjuntos</label>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientPage;
