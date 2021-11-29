import React, {createContext, useEffect, useState} from 'react';

const LanguageContextProvider = props => {
  const [index, setIndex] = useState(0);

  const personInfo = [
    'Personal Information',
    'Informacion Personal',
    'Informações Pessoais',
  ];
  const fullName = ['Full Name', 'Nombre Completo', 'Nome Completo'];
  const email = ['Email', 'Correo Electrónico', 'O Email'];
  const password = ['Password', 'Contraseña', 'Senha'];
  const phoneNo = ['Phone Number', 'Número de teléfono', 'Número de telefone'];
  const period = [
    'Evidence time period',
    'Período de prueba',
    'Período de tempo de evidência',
  ];
  const recTime = [
    'Default Recording Time',
    'Tiempo de grabación predeterminado',
    'Tempo de gravação padrão',
  ];
  const gender = ['Gender', 'Género', 'Gênero'];
  const dob = ['Date of Birth', 'Fecha de Cumpleaños', 'Data de Nascimento'];
  const address = ['Address', 'Dirección', 'Endereço'];
  const country = ['Country', 'País', 'País'];
  const city = ['City', 'Ciudad', 'Cidade'];
  const street = [
    'Complete street address',
    'Dirección postal completa',
    'Endereço completo',
  ];
  const signOut = ['Sign Out', 'Desconectar', 'Cantar'];
  const signIn = ['Sign In', 'Iniciar sesión', 'Entrar'];
  const signUp = ['Sign Up', 'Inscribirse', 'Inscrever-se'];
  const relation = ['Relationship', 'Relación', 'Relação'];

  const welcome = ['Welcome', 'Bienvenido', 'Bem vindo'];
  const back = ['Back', 'de nuevo', 'de volta'];
  const acc = ['Your Own Account', 'tu Propia Cuenta', 'Sua Própria Conta'];
  const passForgot = [
    'Forgotten Password',
    'Contraseña Olvidada',
    'Palavra-chave Esquecida',
  ];
  const record = ['Record', 'Registro', 'Registro'];
  const profile = ['My Profile', 'Mi Perfil', 'Meu Perfil'];
  const evidence = ['Evidence', 'Evidencia', 'Provas'];
  const angel = ['Angels', 'Angeles', 'Anjos'];
  const addAngel = ['Add Angels', 'Agregar Angeles', 'Adicionar Anjos'];
  const editAngel = ['Add Angels', 'Editar Angeles', 'Editar Anjos'];

  const vidRec = [
    'Video Recording Evidence',
    'Evidencia de grabación de Video',
    'Provas de gravação de Vídeo',
  ];
  const audRec = [
    'Audio Recording Evidence',
    'Evidencia de grabación de Audio',
    'Provas de gravação de áudio',
  ];
  const recPrivacy = [
    'Record your Evidence Securely & Privately',
    'Registre su evidencia de forma segura y Privada',
    'Grave suas evidências com segurança e Privacidade',
  ];
  const recTime2 = [
    'you can increase or decrease this Time Period from Profile Setting',
    'puede aumentar o disminuir este período de tiempo desde la configuración del perfi',
    'você pode aumentar ou diminuir este período de tempo na configuração do perfil',
  ];
  const tips = ['Tips', 'Consejos', 'Pontas'];
  const tipsPara = [
    [
      'Please use above option when you are in trouble to record evidence. To record Video evidence press Video Recording it will record both video as well as audio but if you want to record Audio evidence only then press on Audio Recording.',
    ],
    [
      'Utilice la opción anterior cuando tenga problemas para registrar pruebas. Para grabar evidencia de video presione Grabación de video; grabará tanto video como audio pero si desea grabar solo evidencia de audio presione Grabación de audio.',
    ],
    [
      'Por favor use a opção acima quando você estiver com problemas para registrar evidências. Para gravar a evidência de vídeo pressione Gravação de vídeo para gravar o vídeo e o áudio mas se você quiser gravar a evidência de áudio pressione Gravação de áudio.',
    ],
  ];

  const Lang = [
    fullName[index], //--> 0
    email[index], //-----> 1
    password[index], //--> 2
    passForgot[index], //> 3
    period[index], //----> 4
    personInfo[index], //> 5
    address[index], //---> 6
    recTime[index], //---> 7
    phoneNo[index], //---> 8
    gender[index], //----> 9
    dob[index], //-------> 10
    country[index], //---> 11
    city[index], //------> 12
    street[index], //----> 13
    relation[index], //--> 14
    profile[index], //---> 15
    signOut[index], //---> 16
    signIn[index], //----> 17
    signUp[index], //----> 18
    welcome[index], //---> 19
    back[index], //------> 20
    acc[index], //-------> 21
    record[index], //----> 22
    evidence[index], //--> 23
    angel[index], //-----> 24
    addAngel[index], //--> 25
    editAngel[index], //-> 26
    vidRec[index], //----> 27
    audRec[index], //----> 28
    recPrivacy[index], //> 29
    recTime2[index], //--> 30
    tips[index], //------> 31
    tipsPara[index], //--> 32
  ];

  return (
    <LanguageContext.Provider value={{Lang, setIndex}}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;

//Language Context
export const LanguageContext = createContext();
