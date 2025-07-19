export const login = async (req, res, next) => {
    try {
        //SIGN IN LOGIC
        console.log("Sign IN");
    } catch (error) {
        next(error);
    }
};
export const register = async (req, res, next) => {
    try {
        //SIGN UP LOGIC
        console.log("Sign UP");
    } catch (error) {
        next(error);
    }
};
export const logout = async (req, res, next) => {
    try {
        //SIGN IN LOGIC
        console.log("Sign OUT");
    } catch (error) {
        next(error);
    }
};
