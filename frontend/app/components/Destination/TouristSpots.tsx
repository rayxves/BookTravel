import TouristSpotsCards from "./TouristSpotsCards";

export default function TouristSpots({ touristSpots }) {
  const generateId = (ts) => `${ts.name}-${ts.rating}-${ts.formatted_address ?? ''}`;

  return (
    <div className="flex flex-col w-full items-center justify-center cursor-pointer">
      <div className="w-5/6 h-full overflow-y-auto grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-12 p-5 pt-10 place-items-center">
        {touristSpots.length > 0 ? (
          <>
            {touristSpots.map((ts) => {
              return (
                <div key={generateId(ts)}>
                  <TouristSpotsCards
                    name={ts.name}
                    photoUrls={
                      ts.photos[0]?.photoReference
                        ? ts.photos[0].photoReference
                        : null
                    }
                    rating={ts.rating}
                    address={ts.formatted_address}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
