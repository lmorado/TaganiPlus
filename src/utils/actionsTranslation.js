import { getLocalStorage } from './localStorage'

export const invalidInputs = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Username or Password is incorrect.'; break;
        case 'th': message = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'; break;
        case 'my': message = 'သုံးစြဲသူအမည္ သို႔မဟုတ္ စကားဝွက္ မမွန္ပါ။'; break;
        case 'lo': message = 'Username or Password is incorrect.'; break;
        case 'ko': message = '사용자 이름 또는 암호가 틀립니다.'; break;
        case 'zht': message = '用戶名或密碼錯誤'; break;
        case 'zh': message = '用户名或密码错误'; break;
        case 'vi': message = 'Tên người dùng hoặc Mật khẩu không chính xác.'; break;
        case 'id': message = 'Nama Pengguna & Kata Sandi salah'; break;
        case 'km': message = 'ឈ្មោះអ្នកប្រើ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។'; break;
        case 'ja': message = 'ユーザー名またはパスワードが正しくありません。'; break;
        case 'ms': message = 'Nama Pengguna & Kata Laluan Tidak Sah'; break;
        default:
            message = 'Username or Password is incorrect.';
            break;
    }
    return message
}

export const userLocked = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'User is locked.'; break;
        case 'th': message = 'ผู้ใช้ถูกล็อค'; break;
        case 'my': message = 'သုံးစြဲသူ ေလာ့ခ္က်ေနသည္။'; break;
        case 'lo': message = 'User is locked'; break;
        case 'ko': message = '사용자가 잠금이 되었습니다.'; break;
        case 'zht': message = '用戶被鎖'; break;
        case 'zh': message = '用户被锁'; break;
        case 'vi': message = 'Người dùng đã bị khóa'; break;
        case 'id': message = 'Pengguna dikunci'; break;
        case 'km': message = 'អ្នកប្រើត្រូវបានចាក់សោ។'; break;
        case 'ja': message = 'ユーザーはロックされています'; break;
        case 'ms': message = 'Pengguna dikunci'; break;
        default:
            message = 'User is locked.';
            break;
    }
    return message
}

export const maxCredit = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Max Credit'; break;
        case 'th': message = 'ค่าเครดิตสูงสุด'; break;
        case 'my': message = 'အမ်ားဆုံး ခရက္ဒစ္'; break;
        case 'lo': message = 'Max Credit'; break;
        case 'ko': message = '최대 크레딧'; break;
        case 'zht': message = '最大信用額度'; break;
        case 'zh': message = '最大信用额度'; break;
        case 'vi': message = 'Tín dụng tối đa'; break;
        case 'id': message = 'Kredit Maks'; break;
        case 'km': message = 'អឥណទានអតិបរមា'; break;
        case 'ja': message = '最大クレジット'; break;
        case 'ms': message = 'Kredit Maks'; break;
        default:
            message = 'Max Credit';
            break;
    }
    return message
}

export const casinoFlowGaming = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Casino (Flow Gaming)'; break;
        case 'th': message = 'คาสิโน (Flow Gaming)'; break;
        case 'my': message = 'ကာစီႏီု (Flow Gaming)'; break;
        case 'lo': message = 'Casino (Flow Gaming)'; break;
        case 'ko': message = '카지노 (플로우게이밍)'; break;
        case 'zht': message = '娛樂場 (Flow Gaming)'; break;
        case 'zh': message = '娱乐场 (Flow Gaming)'; break;
        case 'vi': message = 'Casino (Flow Gaming)'; break;
        case 'id': message = 'Kasino (PermainanMengalir)'; break;
        case 'km': message = 'កាស៊ីណូ (លំហូរល្បែង)'; break;
        case 'ja': message = 'カジノ (フローゲーミング)'; break;
        case 'ms': message = 'Kasino (Flow Gaming)'; break;
        default:
            message = 'Casino (Flow Gaming)';
            break;
    }
    return message
}

export const casinoJoker = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Casino (Joker)'; break;
        case 'th': message = 'คาสิโน (โจ๊กเกอร์)'; break;
        case 'my': message = 'ကာစီႏီု (ဂ်ဳိကာ)'; break;
        case 'lo': message = 'Casino (Joker)'; break;
        case 'ko': message = '카지노 (조커)'; break;
        case 'zht': message = '娛樂場 (Joker)'; break;
        case 'zh': message = '娱乐场 (Joker)'; break;
        case 'vi': message = 'Casino (Joker)'; break;
        case 'id': message = 'Kasino (PermainanMengalir)'; break;
        case 'km': message = 'កាស៊ីណូ (លំហូរល្បែង)'; break;
        case 'ja': message = 'カジノ (ジョーカー)'; break;
        case 'ms': message = 'Kasino (Joker)'; break;
        default:
            message = 'Casino (Joker)';
            break;
    }
    return message
}


export const creditIsRequired = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Credit is required'; break;
        case 'th': message = 'Credit is required'; break;
        case 'my': message = 'Credit is required'; break;
        case 'lo': message = 'Credit is required'; break;
        case 'ko': message = 'Credit is required'; break;
        case 'zht': message = 'Credit is required'; break;
        case 'zh': message = 'Credit is required'; break;
        case 'vi': message = 'Credit is required'; break;
        case 'id': message = 'Credit is required'; break;
        case 'km': message = 'Credit is required'; break;
        case 'ja': message = 'Credit is required'; break;
        case 'ms': message = 'Credit is required'; break;
        default:
            message = 'Credit is required';
            break;
    }
    return message
}

export const creditsShouldNotExceed = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Credit should not exceed '; break;
        case 'th': message = 'เครดิตไม่ควรเกิน'; break;
        case 'my': message = 'ခရက္ဒစ္မွာ မပိုရပါ'; break;
        case 'lo': message = 'Credit should not exceed'; break;
        case 'ko': message = '크레딧이 초과하지 않아야 합니다'; break;
        case 'zht': message = '信用額度不能超過限制'; break;
        case 'zh': message = '信用额度不能超过限制'; break;
        case 'vi': message = 'Tín dụng không nên vượt quá'; break;
        case 'id': message = 'Kredit tidak boleh melebihi'; break;
        case 'km': message = 'ឥណទានមិនគួរលើស'; break;
        case 'ja': message = 'クレジットの最高額 '; break;
        case 'ms': message = 'Kredit tidak patut melebihi'; break;
        default:
            message = 'Credit should not exceed';
            break;
    }
    return message
}


export const passwordIsRequired = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Password is required'; break;
        case 'th': message = 'Password is required'; break;
        case 'my': message = 'Password is required'; break;
        case 'lo': message = 'Password is required'; break;
        case 'ko': message = 'Password is required'; break;
        case 'zht': message = 'Password is required'; break;
        case 'zh': message = 'Password is required'; break;
        case 'vi': message = 'Password is required'; break;
        case 'id': message = 'Password is required'; break;
        case 'km': message = 'Password is required'; break;
        case 'ja': message = 'Password is required'; break;
        case 'ms': message = 'Password is required'; break;
        default:
            message = 'Password is required';
            break;
    }
    return message
}
export const passwordMinimum = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Password must be at least 8 characters'; break;
        case 'th': message = 'รหัสผ่านจะต้องมีอักขระอย่างน้อย 8 ตัว'; break;
        case 'my': message = 'စကားဝွက္မွာ အနည္းဆုံး အကၡရာ 8 လုံး ျဖစ္ရမည္'; break;
        case 'lo': message = 'Password must be at least 8 characters'; break;
        case 'ko': message = '암호는 최소 8자여야 합니다'; break;
        case 'zht': message = '密碼必需至少包含8個字符'; break;
        case 'zh': message = '密码必需至少包含8个字符'; break;
        case 'vi': message = 'Mật khẩu phải gồm ít nhất 8 ký tự'; break;
        case 'id': message = 'Kata sandi harus setidaknya 8 karakter'; break;
        case 'km': message = 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 8 តួអក្សរ'; break;
        case 'ja': message = 'パスワードは少なくとも8文字にしてください'; break;
        case 'ms': message = 'Kata laluan mesti mengandungi sekurang-kurangnya 8 aksara'; break;
        default:
            message = 'Password must be at least 8 characters';
            break;
    }
    return message
}

export const usernameIsRequired = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Username is required'; break;
        case 'th': message = 'Username is required'; break;
        case 'my': message = 'Username is required'; break;
        case 'lo': message = 'Username is required'; break;
        case 'ko': message = 'Username is required'; break;
        case 'zht': message = 'Username is required'; break;
        case 'zh': message = 'Username is required'; break;
        case 'vi': message = 'Username is required'; break;
        case 'id': message = 'Username is required'; break;
        case 'km': message = 'Username is required'; break;
        case 'ja': message = 'Username is required'; break;
        case 'ms': message = 'Username is required'; break;
        default:
            message = 'Username is required';
            break;
    }
    return message
}

export const telephoneIsRequired = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Telephone is required'; break;
        case 'th': message = 'Telephone is required'; break;
        case 'my': message = 'Telephone is required'; break;
        case 'lo': message = 'Telephone is required'; break;
        case 'ko': message = 'Telephone is required'; break;
        case 'zht': message = 'Telephone is required'; break;
        case 'zh': message = 'Telephone is required'; break;
        case 'vi': message = 'Telephone is required'; break;
        case 'id': message = 'Telephone is required'; break;
        case 'km': message = 'Telephone is required'; break;
        case 'ja': message = 'Telephone is required'; break;
        case 'ms': message = 'Telephone is required'; break;
        default:
            message = 'Telephone is required';
            break;
    }
    return message
}

export const nameIsRequired = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Name is required'; break;
        case 'th': message = 'Name is required'; break;
        case 'my': message = 'Name is required'; break;
        case 'lo': message = 'Name is required'; break;
        case 'ko': message = 'Name is required'; break;
        case 'zht': message = 'Name is required'; break;
        case 'zh': message = 'Name is required'; break;
        case 'vi': message = 'Name is required'; break;
        case 'id': message = 'Name is required'; break;
        case 'km': message = 'Name is required'; break;
        case 'ja': message = 'Name is required'; break;
        case 'ms': message = 'Name is required'; break;
        default:
            message = 'Name is required';
            break;
    }
    return message
}

export const valueShouldNotExceed = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Value should not exceed'; break;
        case 'th': message = 'ค่าจะต้องไม่เกิน'; break;
        case 'my': message = 'တန္ဖိုး အမ်ားဆုံးမွာ'; break;
        case 'lo': message = 'Value should not exceed'; break;
        case 'ko': message = '값은 초과할 수 없는 금액은'; break;
        case 'zht': message = '值不能超過'; break;
        case 'zh': message = '值不能超过'; break;
        case 'vi': message = 'Giá trị không nên vượt quá'; break;
        case 'id': message = 'Nilai tidak boleh melebihi'; break;
        case 'km': message = 'តម្លៃមិនគួរលើស'; break;
        case 'ja': message = '値の最高値'; break;
        case 'ms': message = 'Nilai mesti tidak melebihi'; break;
        default:
            message = 'Value should not exceed';
            break;
    }
    return message
}

export const valueShouldBeAtLeast = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Value should be at least'; break;
        case 'th': message = 'ค่าจะต้องมีอย่างน้อย'; break;
        case 'my': message = 'တန္ဖိုး အနည္းဆုံးမွာ'; break;
        case 'lo': message = 'Value should be at least'; break;
        case 'ko': message = '값은 적어도'; break;
        case 'zht': message = '值必需至少為'; break;
        case 'zh': message = '值必需至少为'; break;
        case 'vi': message = 'Giá trị nên ít nhất'; break;
        case 'id': message = 'Nilai harus setidaknya'; break;
        case 'km': message = 'តម្លៃគួរតែយ៉ាងហោចណាស់'; break;
        case 'ja': message = '値の最低値'; break;
        case 'ms': message = 'Nilai mesti sekurang-kurangnya'; break;
        default:
            message = 'Value should be at least';
            break;
    }
    return message
}

export const minimumAmountIsRequired = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Minimum amount is required'; break;
        case 'th': message = 'ต้องระบุค่าจำนวนต่ำสุด'; break;
        case 'my': message = 'အနည္းဆုံးပမာဏ လိုအပ္သည္'; break;
        case 'lo': message = 'Minimum amount is required'; break;
        case 'ko': message = '최소 금액이 필요합니다'; break;
        case 'zht': message = '最小金額是必填項'; break;
        case 'zh': message = '最小金额是必填项'; break;
        case 'vi': message = 'Số lượng cần tối thiểu'; break;
        case 'id': message = 'Jumlah minimum diperlukan'; break;
        case 'km': message = 'ចំនួនទឹកប្រាក់អប្បបរមាត្រូវបានទាមទារតម្រូវឲ្យមាន'; break;
        case 'ja': message = '最小額は必須です'; break;
        case 'ms': message = 'Amaun minimum diperlukan'; break;
        default:
            message = 'Minimum amount is required';
            break;
    }
    return message
}


export const maximumAmountIsRequired = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Maximum amount is required'; break;
        case 'th': message = 'ต้องระบุค่าจำนวนสูงสุด'; break;
        case 'my': message = 'အမ်ားဆုံးပမာဏ လိုအပ္သည္'; break;
        case 'lo': message = 'Maximum amount is required'; break;
        case 'ko': message = '최대 금액이 필요합니다'; break;
        case 'zht': message = '最大金額是必填項'; break;
        case 'zh': message = '最大金额是必填项'; break;
        case 'vi': message = 'Số lượng cần tối đa'; break;
        case 'id': message = 'Jumlah maksimum diperlukan'; break;
        case 'km': message = 'ចំនួនទឹកប្រាក់អតិបរមាត្រូវបានទាមទារតម្រូវឲ្យមាន'; break;
        case 'ja': message = '最大額は必須です'; break;
        case 'ms': message = 'Amaun maksimum diperlukan'; break;
        default:
            message = 'Maximum amount is required';
            break;
    }
    return message
}

export const minIs = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Minimum is'; break;
        case 'th': message = 'ค่าต่ำสุดคือ'; break;
        case 'my': message = 'အနည္းဆုံးမွာ'; break;
        case 'lo': message = 'Minimum is'; break;
        case 'ko': message = '최소는'; break;
        case 'zht': message = '最小為'; break;
        case 'zh': message = '最小为'; break;
        case 'vi': message = 'Tối thiểu là'; break;
        case 'id': message = 'Minimum adalah'; break;
        case 'km': message = 'អប្បបរមាគឺ'; break;
        case 'ja': message = '"最小'; break;
        case 'ms': message = 'Minimum ialah'; break;
        default:
            message = 'Minimum is';
            break;
    }
    return message
}

export const maxIs = () => {
    let message
    const language = getLocalStorage('locale')
    switch (language) {
        case 'en': message = 'Maximum is'; break;
        case 'th': message = 'ค่าสูงสุดคือ'; break;
        case 'my': message = 'အမ်ားဆုံးမွာ'; break;
        case 'lo': message = 'Maximum is'; break;
        case 'ko': message = '최대는'; break;
        case 'zht': message = '最大為'; break;
        case 'zh': message = '最大为'; break;
        case 'vi': message = 'Tối đa là'; break;
        case 'id': message = 'Maksimum adalah'; break;
        case 'km': message = 'អតិបរមាគឺ'; break;
        case 'ja': message = '最大'; break;
        case 'ms': message = 'Maksimum ialah'; break;
        default:
            message = 'Maximum is';
            break;
    }
    return message
}

