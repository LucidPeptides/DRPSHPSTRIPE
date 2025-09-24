import Image from "next/image"

export function PeptidesInfoSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-center">
        
        {/* Text content */}
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            What Are Peptides?
          </h2>
          <div className="prose prose-lg text-muted-foreground">
            <p className="text-lg leading-relaxed">
              Peptides are short chains of amino acids that serve as building
              blocks for proteins in the body. These naturally occurring
              compounds play crucial roles in various biological processes,
              including tissue repair, immune function, and cellular
              communication. Research peptides are specifically designed for
              scientific study and laboratory research, offering researchers
              valuable tools to explore potential therapeutic applications and
              understand biological mechanisms.
            </p>
            <p className="text-lg leading-relaxed mt-6">
              Our peptides are independently tested for purity and come with
              Certificates of Analysis (CoA) to ensure the highest quality
              standards for your research needs. Each product is carefully
              manufactured and stored under optimal conditions to maintain
              stability and effectiveness.
            </p>
          </div>
        </div>

        {/* Supporting image */}
        <div className="relative w-full max-w-[800px] aspect-[2/1] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/peptides-info.webp"
            alt="Annotated diagram of a peptide chain showing amino acids, peptide bonds, and termini"
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 800px) 100vw, 800px"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
