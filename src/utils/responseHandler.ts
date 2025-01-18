export const successResponse = (res: any, data: any, message = "Success") => {
    res.status(200).json({ message, data });
  };
  
  export const errorResponse = (res: any, error: any, message = "Error") => {
    res.status(500).json({ message, error });
  };
  