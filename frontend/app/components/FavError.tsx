export default function FavError({ error }) {
    return (<div className="w-full h-full items-center justify-center">
        <p className="w-fit h-fit p-5 bg-red-400 border-l-4 border-red-700">{error}</p>
    </div>)
}
