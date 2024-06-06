const FeaturedInfo = ({ type, value }) => {
  return (
    <div className="shadow-lg p-6 flex-1">
      <h3 className="text-xl">{type}</h3>
      <div className="py-4 flex items-center gap-3">
        <span className="font-bold text-2xl">{value}</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
