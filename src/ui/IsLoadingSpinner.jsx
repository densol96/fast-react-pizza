function IsLoadingSpinner() {
  return (
    <div className="absolute flex h-[100vh] w-[100vw] items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}

export default IsLoadingSpinner;
