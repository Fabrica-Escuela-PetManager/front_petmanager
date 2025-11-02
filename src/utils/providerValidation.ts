export interface ValidationResult {
  isValid: boolean;
  errorType?: 
    | "invalid-name"
    | "invalid-nit"
    | "nit-exists"
    | "invalid-email"
    | "invalid-phone"
    | "invalid-address"
    | "invalid-password";
  message?: string;
}

export interface Provider {
  id: string;
  nombre: string;
  nit: string;
  email: string;
  telefono: string;
  direccion: string;
  createdAt: string;
}

// Validar nombre: solo letras, espacios y signos diacríticos
export function validateName(name: string): ValidationResult {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  if (!name.trim() || !nameRegex.test(name)) {
    return { 
      isValid: false, 
      errorType: "invalid-name",
      message: "El campo nombre solo debe contener letras, espacios y signos diacríticos. No se permiten números ni caracteres especiales."
    };
  }
  return { isValid: true };
}

// Validar NIT: solo números y opcionalmente un guion
export function validateNIT(nit: string): ValidationResult {
  const nitRegex = /^\d+(-\d)?$/;
  if (!nit.trim() || !nitRegex.test(nit)) {
    return { 
      isValid: false, 
      errorType: "invalid-nit",
      message: "El NIT ingresado no es válido. Debe contener solo números y, opcionalmente, un guion antes del dígito de verificación."
    };
  }
  return { isValid: true };
}

// Validar email: formato válido con caracteres especiales permitidos
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.trim() || !emailRegex.test(email)) {
    return { 
      isValid: false, 
      errorType: "invalid-email",
      message: "Ingrese una dirección de correo electrónico válida. Debe contener un @ y un dominio correcto."
    };
  }
  return { isValid: true };
}

// Validar teléfono: solo números
export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /^\d+$/;
  if (!phone.trim() || !phoneRegex.test(phone)) {
    return { 
      isValid: false, 
      errorType: "invalid-phone",
      message: "El campo teléfono solo debe contener números. No se permiten letras ni símbolos."
    };
  }
  return { isValid: true };
}

// Validar dirección: campo obligatorio con mínimo 5 caracteres
export function validateAddress(address: string): ValidationResult {
  if (!address.trim() || address.trim().length < 5) {
    return { 
      isValid: false, 
      errorType: "invalid-address",
      message: "El campo dirección no puede estar vacío y debe tener al menos 5 caracteres."
    };
  }
  return { isValid: true };
}

// Validar contraseña: mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial
export function validatePassword(password: string): ValidationResult {
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$%!#?]/.test(password);

  if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return { 
      isValid: false, 
      errorType: "invalid-password",
      message: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial."
    };
  }
  return { isValid: true };
}

// Verificar si el NIT ya existe
export function checkNITExists(nit: string): boolean {
  const providers = getProviders();
  return providers.some(provider => provider.nit === nit);
}

// Obtener proveedores del localStorage
export function getProviders(): Provider[] {
  const stored = localStorage.getItem("proveedores");
  return stored ? JSON.parse(stored) : [];
}

// Guardar proveedor en localStorage
export function saveProvider(provider: Omit<Provider, "id" | "createdAt">): Provider {
  const providers = getProviders();
  const newProvider: Provider = {
    ...provider,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  providers.push(newProvider);
  localStorage.setItem("proveedores", JSON.stringify(providers));
  return newProvider;
}
