import { useState, useEffect } from 'react';

function App() {
  const [numeros, setNumeros] = useState([]);
  const [numeroActual, setNumeroActual] = useState('');
  const [tablaVisible, setTablaVisible] = useState(false);

  // función para agregar un número a la lista
  const agregarNumero = () => {
    // asegurarse de que el número ingresado sea un entero
    const numeroEntero = parseInt(numeroActual);
    if (isNaN(numeroEntero)) return;
    
    // asegurarse de que no se hayan ingresado más de 300 números
    if (numeros.length >= 300) {
      alert('Ya has ingresado 300 números');
      return;
    }

    // agregar el número a la lista de números
    setNumeros([...numeros, numeroEntero]);

    // limpiar el campo de entrada
    setNumeroActual('');

    // mostrar la tabla y el botón de eliminar
    setTablaVisible(true);
  };

  // función para ordenar los números de mayor a menor
  const ordenarNumeros = () => {
    const numerosOrdenados = [...numeros].sort((a, b) => b - a);
    setNumeros(numerosOrdenados);
  };

  // función para eliminar los datos ingresados
  const eliminarDatos = () => {
    setNumeros([]);
    setTablaVisible(false);
    localStorage.removeItem('numeros');
  };

  // objeto para almacenar las cantidades de cada número
  const cantidades = {};
  numeros.forEach(numero => {
    if (!cantidades[numero]) cantidades[numero] = 0;
    cantidades[numero]++;
  });

  // cargar los datos del almacenamiento local
  useEffect(() => {
    const numerosGuardados = localStorage.getItem('numeros');
    if (numerosGuardados) {
      setNumeros(JSON.parse(numerosGuardados));
      setTablaVisible(true);
    }
  }, []);

  // guardar los datos en el almacenamiento local cuando cambie el estado de los números
  useEffect(() => {
    localStorage.setItem('numeros', JSON.stringify(numeros));
  }, [numeros]);

  return (
    <div className="App">
      <div>
        <label htmlFor="numero">Ingresa un número:</label>
        <input type="text" id="numero" value={numeroActual} onChange={e => setNumeroActual(e.target.value)} />
        <button onClick={agregarNumero}>Agregar</button>
        <p>{numeros.length} de 300 números ingresados</p>
      </div>
      {tablaVisible && (
        <div>
          <button onClick={ordenarNumeros}>Ordenar</button>
          <button onClick={eliminarDatos}>Eliminar datos</button>
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(cantidades).map(numero => (
                <tr key={numero}>
                  <td>{numero}</td>
                  <td>{cantidades[numero]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
