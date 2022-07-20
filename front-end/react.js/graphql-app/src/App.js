import { useQuery, gql } from "@apollo/client";
import "./App.css";

const FILMS_QUERY = gql`
  {
    launchesPast(limit: 10, sort: "launch_date_local", order: "desc") {
      id
      mission_name
      launch_date_local
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(FILMS_QUERY);
  const className = "LaunchList";
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="App">
      <h1>SpaceX Launches</h1>
      <ul>
        {data.launchesPast.map((launch) => (
          <ol className={`${className}__list`}>
            <li key={launch.id} className={`${className}__item`}>
              {launch.mission_name} ({launch.launch_date_local})
            </li>
          </ol>
        ))}
      </ul>
    </div>
  );
}

export default App;
