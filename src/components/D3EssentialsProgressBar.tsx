import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface D3EssentialsProgressBarProps {
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export function D3EssentialsProgressBar({
  completedCount,
  totalCount,
  percentage,
}: D3EssentialsProgressBarProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const prevPercentageRef = useRef<number>(0);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const viewBoxWidth = 320;
    const viewBoxHeight = 38;
    const barHeight = 12;
    const barY = 8;
    const barRadius = 6;

    // Defs: Gradients and drop shadow filter
    const defs = svg.append('defs');

    // Linear gradient for in-progress state
    const grad = defs
      .append('linearGradient')
      .attr('id', 'd3-essentials-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    grad.append('stop').attr('offset', '0%').attr('stop-color', '#6366f1'); // Indigo
    grad.append('stop').attr('offset', '60%').attr('stop-color', '#8b5cf6'); // Violet
    grad.append('stop').attr('offset', '100%').attr('stop-color', '#a855f7'); // Purple

    // Linear gradient for 100% completed state
    const fullGrad = defs
      .append('linearGradient')
      .attr('id', 'd3-essentials-full-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');

    fullGrad.append('stop').attr('offset', '0%').attr('stop-color', '#10b981'); // Emerald
    fullGrad.append('stop').attr('offset', '100%').attr('stop-color', '#059669');

    // Glow filter
    const filter = defs
      .append('filter')
      .attr('id', 'd3-bar-glow')
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');

    filter
      .append('feDropShadow')
      .attr('dx', '0')
      .attr('dy', '1')
      .attr('stdDeviation', '2')
      .attr('flood-color', percentage === 100 ? '#10b981' : '#6366f1')
      .attr('flood-opacity', '0.35');

    // Background track
    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', barY)
      .attr('width', viewBoxWidth)
      .attr('height', barHeight)
      .attr('rx', barRadius)
      .attr('ry', barRadius)
      .attr('fill', '#f1f5f9')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 1);

    // Quarter milestones (25%, 50%, 75%)
    const milestones = [0.25, 0.5, 0.75];
    milestones.forEach((m) => {
      const mx = m * viewBoxWidth;
      svg
        .append('line')
        .attr('x1', mx)
        .attr('y1', barY + 1)
        .attr('x2', mx)
        .attr('y2', barY + barHeight - 1)
        .attr('stroke', '#cbd5e1')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '2,1');
    });

    const prevWidth = Math.max(0, (prevPercentageRef.current / 100) * viewBoxWidth);
    const targetWidth = Math.max(0, (Math.min(100, percentage) / 100) * viewBoxWidth);

    // Active progress bar
    if (targetWidth > 0 || prevWidth > 0) {
      const activeBar = svg
        .append('rect')
        .attr('x', 0)
        .attr('y', barY)
        .attr('width', prevWidth)
        .attr('height', barHeight)
        .attr('rx', barRadius)
        .attr('ry', barRadius)
        .attr('fill', percentage === 100 ? 'url(#d3-essentials-full-gradient)' : 'url(#d3-essentials-gradient)')
        .attr('filter', 'url(#d3-bar-glow)');

      activeBar
        .transition()
        .duration(650)
        .ease(d3.easeCubicOut)
        .attr('width', targetWidth);

      // Leading indicator thumb dot
      if (targetWidth > 8) {
        const thumb = svg
          .append('circle')
          .attr('cx', prevWidth)
          .attr('cy', barY + barHeight / 2)
          .attr('r', 5)
          .attr('fill', '#ffffff')
          .attr('stroke', percentage === 100 ? '#10b981' : '#6366f1')
          .attr('stroke-width', 2.5);

        thumb
          .transition()
          .duration(650)
          .ease(d3.easeCubicOut)
          .attr('cx', targetWidth);
      }
    }

    // Milestone labels along the bottom
    const labels = [
      { text: '0%', pos: 0, anchor: 'start' },
      { text: '50%', pos: viewBoxWidth * 0.5, anchor: 'middle' },
      { text: '100%', pos: viewBoxWidth, anchor: 'end' },
    ];

    labels.forEach((lbl) => {
      svg
        .append('text')
        .attr('x', lbl.pos)
        .attr('y', barY + barHeight + 12)
        .attr('text-anchor', lbl.anchor)
        .attr('fill', '#94a3b8')
        .attr('font-size', '9px')
        .attr('font-weight', '600')
        .attr('letter-spacing', '0.04em')
        .text(lbl.text);
    });

    prevPercentageRef.current = percentage;
  }, [percentage]);

  const getStatusBadge = () => {
    if (percentage === 100) {
      return {
        label: 'All Done ✓',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dotClass: 'bg-emerald-500',
      };
    }
    if (percentage >= 50) {
      return {
        label: 'In Progress',
        badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        dotClass: 'bg-indigo-500',
      };
    }
    return {
      label: 'Getting Started',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      dotClass: 'bg-slate-400',
    };
  };

  const status = getStatusBadge();

  return (
    <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200 mb-4 shadow-2xs">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
            Checklist Progress
          </span>
          <span className="text-[9px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
            D3.js
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${status.badgeClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dotClass} ${percentage === 100 ? '' : 'animate-pulse'}`} />
            {status.label}
          </span>
          <span className="font-headline-md text-sm font-extrabold text-slate-900">
            {percentage}%
          </span>
        </div>
      </div>

      {/* SVG Canvas rendered via D3 */}
      <div className="w-full">
        <svg
          ref={svgRef}
          viewBox="0 0 320 38"
          className="w-full h-auto overflow-visible select-none"
          preserveAspectRatio="none"
        />
      </div>

      {/* Metric caption */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
        <span>Completed: <strong>{completedCount}</strong> of <strong>{totalCount}</strong> items</span>
        <span>{totalCount - completedCount > 0 ? `${totalCount - completedCount} remaining` : 'Complete!'}</span>
      </div>
    </div>
  );
}
