import bcrypt from 'bcrypt'


export const hashearPassword = async (password: string)=>{
    const salt = await bcrypt.genSalt(10)
    const hashed = password = await bcrypt.hash(password, salt)
    return hashed
    
}


