namespace ProAgil.Domain
{
    public class PalestranteEvento
    {
        public Palestrante Palestrante { get; set; }
        public int PalestranteId { get; set; }
        public Evento Evento { get; set; }
        public int EventoId { get; set; }
    }
}