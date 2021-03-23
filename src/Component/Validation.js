export const validatePhone = (phone = "") =>
  phone.length < 9 ? "يرجى ادخال هاتف جوال صحيح" : null;

export const validatePassword = (password) =>
  password.length < 6 ? "يرجى ادخال كلمة السر مكونه من 6 حروف او اكثر" : null;

export const validateEmail = (email = "") => {
  let mailReg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return !mailReg.test(String(email).toLowerCase())
    ? "يرجى ادخال بريد الكتروني صحيح"
    : null;
};

export const validateTwoPasswords = (password, confirmPassword) => {
  return password != confirmPassword
    ? "كلمة السر وتأكيد كلمة السر غير متطابقتين"
    : null;
};

export const validateNameAr = (name = "") =>
  name.length < 3
    ? "يرجى ادخال الاسم باللغه العربية -- مكون من 3 حروف او اكثر"
    : null;

export const validateNameEn = (name = "") =>
  name.length < 3
    ? "يرجى ادخال الاسم باللغه الانجليزية -- مكون من 3 حروف او اكثر"
    : null;

export const validateContact = (number = "") => {
  if (isNaN(number)) {
    return "يرجى ادخال رقم تواصل صحيح";
  } else {
    return number ? null : "يرجى ادخال رقم تواصل صحيح";
  }
};

export const validateNeighbor = (name = "") =>
  name ? null : "يرجى اختيار الحي";

export const validateBranchNumber = (name = "") =>
  name ? null : "يرجى ادخال رقم الفرع";

export const validateselectedBranchId = (name = "") =>
  name ? null : "يرجى اختيار الشركة";

export const validateAvatar = (avatar = "") =>
  avatar ? null : "يرجى رفع صورة";

export const validateCompany = (avatar = "") =>
  avatar ? null : "يرجى ادخال اسم الشركة";

export const validateImagesNum = (avatar = "") =>
  avatar ? null : "يرجى ادخال عدد الصور";

export const validateNormalState = (state = "") =>
  state ? null : "يرجى ادخال الحالة الطبيعيه";
