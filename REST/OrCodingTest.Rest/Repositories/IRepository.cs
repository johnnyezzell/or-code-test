namespace OrCodingTest.Rest.Repositories;

public interface IRepository<T>
{
    Task<IEnumerable<T>> GetAll(int foreignId = -1);
    Task<T> GetById(int id, int foreignId = -1);
    Task Create(T entity);
    Task Update(T entity);
    Task Delete(int id, int foreignId = -1);
}
