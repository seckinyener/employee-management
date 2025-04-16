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
      employeeList: 'Employee List'
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
      employeeList: 'Çalışan Listesi'
    }
};
  
export function getLang() {
  return document.documentElement.lang || 'en';
}

export function t(key) {
  const lang = getLang();
  return translations[lang][key] || key;
}


  