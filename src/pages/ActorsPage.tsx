const ActorsPage = () => {
  return (
    <div className="bg-black text-white w-full h-full">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,2fr] md:grid-cols-[2fr,1fr] sm:grid-cols-[2fr,1fr]">
        <div>
          <img src="https://placehold.co/400x550" alt="actor image" className="rounded-lg ml-12"></img>
        </div>
        <div>
          <div className="mb-8">
            <p className="text-3xl">Имя Фамилия</p>
            <p className="text-xl">First Name Last Name</p>
          </div>
          <div className="flex grid grid-cols-1 gap-y-2 md:grid-cols-[1fr,2fr]">
            <div className="flex flex-col">
              <p className="text-gray-400 text-xl">Карьера:</p>
              <p className="text-xl">Актер, продюсер, сценарист</p>
            </div>
            <div>
              <p className="text-gray-400 text-xl">Дата рождения:</p>
              <p className="text-xl">13 января 1922, 102 года</p>
            </div>
            <div>
              <p className="text-gray-400 text-xl">Рост:</p>
              <p className="text-xl">1.7 м</p>
            </div>
            <div>
              <p className="text-gray-400 text-xl">Дата смерти:</p>
              <p className="text-xl">13 января 1922, 102 года</p>
            </div>
            <div>
              <p className="text-gray-400 text-xl">Место рождения:</p>
              <p className="text-xl">Нью-Йорк, США</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorsPage;
