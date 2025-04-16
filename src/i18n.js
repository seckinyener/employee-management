export const translations = {
    en: {
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfEmployment: 'Date of Employment',
      dateOfBirth: 'Date of Birth',
      phone: 'Phone',
      email: 'Email',
      department: 'Department',
      position: 'Position',
      actions: 'Actions',
      save: 'Save',
      cancel: 'Cancel',
      employees: 'Employees',
      addNew: 'Add New',
      editEmployee: 'Edit Employee',
      youAreEditing: 'You are editing',
      edit: 'Edit',
      delete: 'Delete',
      proceed: 'Proceed',
      employeeList: 'Employee List',
      required: 'This field is required.',
      invalidEmail: 'Please enter a valid email address.',
      invalidPhone: 'Please enter a valid phone number.',
      invalidDateOfBirth: 'Date of birth should be before than employment date.',
      userAlreadyExist: '*** User already has a record. Please check first name, last name and date of birth.'
    },
    tr: {
      firstName: 'İsim',
      lastName: 'Soyisim',
      dateOfEmployment: 'İşe Giriş Tarihi',
      dateOfBirth: 'Doğum Tarihi',
      phone: 'Telefon',
      email: 'E-posta',
      department: 'Departman',
      position: 'Pozisyon',
      actions: 'Aksiyonlar',
      save: 'Kaydet',
      cancel: 'İptal',
      employees: 'Çalışanlar',
      addNew: 'Yeni Ekle',
      editEmployee: 'Çalışanı Düzenle',
      youAreEditing: 'Düzenliyorsunuz',
      edit: 'Düzenle',
      delete: 'Sil',
      proceed: 'Devam Et',
      employeeList: 'Çalışan Listesi',
      required: 'Bu alan zorunludur.',
      invalidEmail: 'Lütfen geçerli bir e-posta adresi girin.',
      invalidPhone: 'Lütfen geçerli bir telefon numarası girin.',
      invalidDateOfBirth: 'Doğum tarihinin işe giriş tarihinden önce olmalıdır.',
      userAlreadyExist: '*** Girilmiş olan çalışan isim, soyisim ve doğum tarihi bilgileriyle çalışan kaydı bulunmaktadır.'
    }
};
  
export function getLang() {
  return document.documentElement.lang || 'en';
}

export function setLang(lang) {
  //localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent('languageChanged'));
}

export function t(key) {
  const lang = getLang();
  return translations[lang][key] || key;
}


  