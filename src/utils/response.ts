export const resMessage=(todo: any, message: any)=>{
    return {
        success: true,
        isError: false,
        data: todo,
        message: message || "Successfully created!",
        error: ""
    }
}
export const resErrMessage=(error: any)=>{
    return {
        success: false,
        isError: true,
        data: {},
        message: "",
        error
    }
}


export const resFunction= (done: ()=>any)=>{
    try {
        const res = done();
        return res;
    } catch (error) {
        return resErrMessage(error);
    }
}