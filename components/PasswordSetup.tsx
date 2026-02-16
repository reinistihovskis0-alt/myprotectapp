import React, { useState } from 'react';

interface PasswordSetupProps {
  onComplete: (pwd: string) => void;
}

const PasswordSetup: React.FC<PasswordSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleFinish = () => {
    const currentInput = step === 1 ? password : confirmPassword;
    if (currentInput.length < 15) {
      setError('Minimum 15 characters required.');
      return;
    }
    if (step === 1) {
      setStep(2);
      setError('');
    } else {
      if (password === confirmPassword) {
        onComplete(password);
      } else {
        setError('Passwords mismatch.');
        setTimeout(() => setStep(1), 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#020617] flex items-center justify-center p-4 z-[100] font-mono">
      <div className="w-full max-w-md glass p-10 rounded-[3rem] border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 animate-pulse"></div>
        <div className="text-center mb-8">
          <h2 className="text-xl font-orbitron font-bold text-white uppercase tracking-widest">
            {step === 1 ? 'CREATE MASTER KEY' : 'CONFIRM MASTER KEY'}
          </h2>
          <p className="text-slate-500 text-[10px] mt-2 leading-relaxed uppercase">Minimum 15 characters required for encryption.</p>
        </div>

        <div className="space-y-6">
          <input 
            type="text"
            value={step === 1 ? password : confirmPassword}
            onChange={(e) => step === 1 ? setPassword(e.target.value) : setConfirmPassword(e.target.value)}
            className="w-full bg-black border border-cyan-900 focus:border-cyan-400 p-4 rounded-xl text-center text-cyan-400 font-bold outline-none"
            placeholder="ENTER_PASSPHRASE"
          />
          {error && <p className="text-rose-500 text-[10px] text-center uppercase font-bold">{error}</p>}
          <button onClick={handleFinish} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl transition-all">
            {step === 1 ? 'NEXT' : 'ACTIVATE SHIELD'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetup;
