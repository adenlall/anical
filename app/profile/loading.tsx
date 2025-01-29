export default function Loading() {
  return <div className="container mx-auto md:px-4 py-8">
    <div className="flex justify-between items-center flex-col md:mb-0 mb-6">

      <div className="flex items-center w-full gap-2 mb-8 group">
        <div className="join join-vertical">
          <div className="join-item btn btn-sm btn-square">
            <span className="w-5 h-5" />
          </div>
          <div className="join-item btn btn-sm btn-square">
            <span className="w-5 h-5" />
          </div>
          <div className="join-item btn btn-sm btn-square">
            <span className="w-5 h-5" />
          </div>
        </div>
        <div className="avatar">
          <div className="w-24 rounded-full bg-base-200 skeleton">
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-6 w-48 bg-base-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-base-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-base-200 rounded animate-pulse" />
        </div>
      </div>

      <div className={"my-4 p-2 py-24 skeleton w-full bg-base-200 rounded-box"}>
        <ul className={"p-4 grid justify-items-center grid-list"}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-base-200 skeleton rounded-lg p-4 flex space-x-4 animate-pulse"
            />
          ))}
        </ul>
      </div>

      {/* <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 flex space-x-4 animate-pulse"
          >
            <div className="w-24 h-36 bg-gray-200 rounded" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div> */}
    </div>
  </div>
}