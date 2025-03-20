const Login = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="border p-2 w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-2"
          />
          <button className="bg-blue-600 text-white p-2 w-full">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;  