namespace ProAgil.Domain
{
    public class PalestranteEvento
    {
        public Palestrante Palesatrant { get; set; }
        public int PalestranteId { get; set; }
        public Evento Evento { get; set; }
        public int EventoId { get; set; }
    }
}