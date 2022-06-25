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
public class ResampleSize
{
    private float factor = 1;
    public float ResampleFactor
    {
        get { return factor; }
        set { factor = value; }
    }
    public IObservable<Size> Process(IObservable<Size> source)
    {
        return source.Select(value => {
            return new Size((int) (value.Width * factor), (int) (value.Height * factor));
        });
    }
}
