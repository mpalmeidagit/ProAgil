using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        //GERAL
        //==== T - Significa tipo genérico
        //==== where T : class - Significa que o tipo T deve ser um tipo de referência (não um tipo de valor).
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        //EVENTOS
        //==== A classe Task<> executa tarefas de formas assíncrona. O exemplo a seguir cria 20 tarefas que serão repetidas até que um 
        //contador seja incrementado para um valor de 2 milhões. Quando as 10 primeiras tarefas atingem 2 milhões, o token de 
        //cancelamento é cancelado e todas as tarefas cujos contadores não chegaram 2 milhões são canceladas.
        //=== Atenção - A classe Task<> abrirá uma Theads
        Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
        Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes);

        //PALESTRANTE
        Task<Palestrante[]> GetAllPalestranteAsyncByName(string name, bool includeEventos);
        Task<Palestrante> GetPalestranteAsync(int PalestranteId, bool includeEventos);

    }
}