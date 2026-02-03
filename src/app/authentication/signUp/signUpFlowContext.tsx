'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export type PlanId = 'starter' | 'premium' | 'advanced';

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

type SignUpFlowValue = {
  form: SignUpFormData;
  setForm: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  selectedPlan: PlanId | null;
  setSelectedPlan: React.Dispatch<React.SetStateAction<PlanId | null>>;
};

const SignUpFlowContext = createContext<SignUpFlowValue | null>(null);

const initialForm: SignUpFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export function SignUpFlowProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<SignUpFormData>(initialForm);
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);

  const value = useMemo(
    () => ({ form, setForm, selectedPlan, setSelectedPlan }),
    [form, selectedPlan]
  );

  return <SignUpFlowContext.Provider value={value}>{children}</SignUpFlowContext.Provider>;
}

export function useSignUpFlow() {
  const ctx = useContext(SignUpFlowContext);
  if (!ctx) throw new Error('useSignUpFlow deve ser usado dentro de <SignUpFlowProvider>.');
  return ctx;
}


