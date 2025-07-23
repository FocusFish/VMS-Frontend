import { AuthReducer, AuthActions } from ".";

describe("AuthReducer", () => {
  describe("undefined action", () => {
    it("should return the default state", () => {
      const { initialState } = AuthReducer;
      const action = { type: undefined, payload: undefined };
      const state = AuthReducer.authReducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  const authState = {
    jwtToken: {
      // tslint:disable-next-line:max-line-length
      raw: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ1c20vYXV0aGVudGljYXRpb24iLCJpc3MiOiJ1c20iLCJzdWIiOiJhdXRoZW50aWNhdGlvbiIsImlhdCI6MTU1NDgxOTQxMywiZXhwIjoxNTU0ODIzMzAyLCJ1c2VyTmFtZSI6InZtc191c2VyIn0.6lLd-GQOtz4VhkAYqWeCLr7_OaMXI4F9JpSj6eaeCNU",
      decoded: {
        jti: "usm/authentication",
        iss: "usm",
        sub: "authentication",
        iat: 1554819413,
        exp: 1554823302,
        features: 123,
        userName: "vms_user",
      },
    },
    data: {
      username: "vms_user",
    },
  };

  describe("AuthActions.loginSuccess", () => {
    it("should return a acceptable user object.", () => {
      const state = AuthReducer.authReducer(
        undefined,
        AuthActions.loginSuccess({ jwtToken: authState.jwtToken.raw })
      );

      expect(state.user.jwtToken.raw).toEqual(authState.jwtToken.raw);
    });
  });

  describe("AuthActions.loginFailed", () => {
    it("should return a acceptable user object.", () => {
      const { initialState } = AuthReducer;
      const state = AuthReducer.authReducer(
        undefined,
        AuthActions.loginFailed({ error: "failed" })
      );

      expect(state).toEqual(initialState);
    });
  });
});
