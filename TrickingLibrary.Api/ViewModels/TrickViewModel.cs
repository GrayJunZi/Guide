using System.Linq.Expressions;
using TrickingLibrary.Models;

namespace TrickingLibrary.Api.ViewModels;

public static class TrickViewModel
{
    public static Expression<Func<Trick, object>> Default =>
        trick => new
        {
            trick.Id,
            trick.Name,
            trick.Description,
            trick.Difficulty,
            Categories = trick.TrickCategories.Select(x => x.CategoryId)
        };
}