import { useSelector } from 'react-redux';

export default function Final() {
  const activeStep = useSelector((state) => state.activeStep);
  return (
    <div>
      <h1>Bước 3 : final</h1>
      {activeStep >= 2 && (
        <button type="submit" className="btn btn-primary mt-5">
          Submit
        </button>
      )}
    </div>
  );
}
