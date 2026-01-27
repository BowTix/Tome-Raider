
export default function BookDetails() {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-surface-highlight mb-4 border-2 border-transparent group-hover:border-primary transition-all">
                    <img src={`https://placehold.co/400x600/171717/ffffff?text=ITEM+0${i}`} className="w-full transform group-hover:scale-110 transition duration-500" alt="Book"/>
                    <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 uppercase skew-x-[-10deg]">New</div>
                </div>
                <h3 className="font-bold uppercase text-lg leading-none group-hover:text-primary">Cyber Culture</h3>
                <p className="text-neutral-500 text-sm font-bold uppercase">William Gibson</p>
            </div>
        </div>
    )
}