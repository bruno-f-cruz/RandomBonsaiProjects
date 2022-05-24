using Bonsai;
using System;
using System.ComponentModel;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using OpenCV.Net;

[Combinator]
[Description("")]
[WorkflowElementCategory(ElementCategory.Transform)]
public class CollectionToArray
{
    public IObservable<Point[][]> Process(IObservable<IList<Point[]>> source)
    {
        return source.Select(value => {
            return value.ToArray();
        });
    }
}


