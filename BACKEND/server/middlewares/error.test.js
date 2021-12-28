const { ValidationError } = require("express-validation");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Given a notFoundErrorHandler middleware", () => {
  describe("When an endpoint is not found", () => {
    test("Then it should send a response with a 'Page not found' error message an a 404 status code", () => {
      const res = mockResponse();
      const expectedError = { error: "Page not found" };

      notFoundErrorHandler(null, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a generalErrorHandler middleware", () => {
  describe("When it receives an error without error code", () => {
    test("Then it should send a response with 'General Error' message and a status code of 500", () => {
      const res = mockResponse();
      const expectedError = { error: "General Error" };

      generalErrorHandler(expectedError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives an error with 'Unauthorized error test' message and a 401 error code", () => {
    test("Then it should send a response with the error's message and a status code of 401", () => {
      const res = mockResponse();
      const expectedError = { error: "Unauthorized error test", code: 401 };

      generalErrorHandler(expectedError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: expectedError.message });
    });
  });

  describe("When it receives a Validation error", () => {
    test("Then it should send a response with the error's message 'Sorry, bad request' and a status code of 400", () => {
      const res = mockResponse();
      const expectedError = new ValidationError("test", {
        error: new Error(),
        statusCode: 400,
      });

      generalErrorHandler(expectedError, null, res, null);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Sorry, bad request" });
    });
  });
});
