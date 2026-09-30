/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { RoleBasedBanner } from '../common/RoleBasedBanner';
import { 
  Network, 
  List, 
  Info, 
  ChevronRight, 
  SlidersHorizontal,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { GraphNode } from '../../types';

export const CampusGraphView: React.FC = () => {
  const { 
    nodes, 
    links, 
    selectedNodeId, 
    setSelectedNodeId, 
    setCurrentSection 
  } = useCampus();

  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [searchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  // Connected links and nodes for the selected node
  const connectedLinks = selectedNode
    ? links.filter(l => l.source === selectedNode.id || l.target === selectedNode.id)
    : [];

  const filteredNodes = nodes.filter(n => {
    const matchesSearch = 
      n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || n.type === filterType;
    return matchesSearch && matchesType;
  });

  const getNodeColor = (node: GraphNode) => {
    switch (node.type) {
      case 'incident':
        return { fill: '#e11d48', stroke: '#be123c', text: '#9f1239', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'asset':
        return { fill: '#d97706', stroke: '#b45309', text: '#92400e', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'room':
      case 'activity':
        return { fill: '#0284c7', stroke: '#0369a1', text: '#075985', bg: 'bg-sky-50 text-sky-700 border-sky-200' };
      case 'building':
        return { fill: '#2563eb', stroke: '#1d4ed8', text: '#1e40af', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'campus':
      default:
        return { fill: '#4f46e5', stroke: '#4338ca', text: '#3730a3', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    }
  };

  return (
    <div className="space-y-6">
      <RoleBasedBanner />

      {/* Header & Controls */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              SATI Infrastructure & Spatial Topology Digital Twin
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Physical layout, utility distribution networks, academic venues, and cascading service relationships at SATI Vidisha
          </p>
        </div>

        {/* View Toggle & Search */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Segmented control */}
          <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs">
            <button
              onClick={() => setViewMode('graph')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                viewMode === 'graph' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Spatial Topology</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                viewMode === 'list' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Inventory Table</span>
            </button>
          </div>

          {/* Filter dropdown */}
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs"
          >
            <option value="all">All Infrastructure Types</option>
            <option value="building">Buildings & Hostels</option>
            <option value="asset">Utility Equipment</option>
            <option value="room">Laboratories & Rooms</option>
            <option value="activity">Academic Sessions</option>
            <option value="incident">Active Incidents</option>
          </select>
        </div>
      </div>

      {/* Main Content Area: Graph Canvas or List View + Side Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Interactive Graph or List */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col min-h-[520px] shadow-xs">
          {viewMode === 'graph' ? (
            <div className="relative flex-1 bg-slate-50/70 p-4 flex flex-col justify-between overflow-hidden">
              {/* Graph Legend Overlay */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 bg-white/95 border border-slate-200 p-2.5 rounded-xl z-10 w-fit backdrop-blur-xs shadow-2xs">
                <span className="font-bold text-slate-800">Legend:</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>Building</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span>Utility Asset</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                  <span>Room / Lab</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  <span>Active Incident</span>
                </span>
              </div>

              {/* Interactive SVG Diagram */}
              <div className="w-full flex-1 flex items-center justify-center my-3 relative">
                <svg
                  viewBox="0 0 960 540"
                  className="w-full h-auto max-h-[480px] drop-shadow-xs select-none"
                >
                  <defs>
                    <marker
                      id="arrow-observed"
                      viewBox="0 0 10 10"
                      refX="22"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
                    </marker>
                    <marker
                      id="arrow-possible"
                      viewBox="0 0 10 10"
                      refX="22"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
                    </marker>
                  </defs>

                  {/* Draw Links */}
                  {links.map((link, idx) => {
                    const sourceNode = nodes.find(n => n.id === link.source);
                    const targetNode = nodes.find(n => n.id === link.target);
                    if (!sourceNode || !targetNode) return null;

                    const isSelected = 
                      selectedNodeId === link.source || 
                      selectedNodeId === link.target;

                    const strokeColor = link.nature === 'observed' 
                      ? '#0284c7' 
                      : link.nature === 'possible'
                      ? '#d97706'
                      : '#2563eb';

                    return (
                      <g key={idx}>
                        <line
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke={strokeColor}
                          strokeWidth={isSelected ? 2.5 : 1.5}
                          strokeDasharray={link.nature === 'possible' ? '4 3' : undefined}
                          opacity={isSelected ? 0.95 : 0.45}
                          markerEnd={`url(#arrow-${link.nature})`}
                        />
                        {/* Middle Link Label */}
                        <text
                          x={(sourceNode.x + targetNode.x) / 2}
                          y={(sourceNode.y + targetNode.y) / 2 - 6}
                          fill="#64748b"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="600"
                          textAnchor="middle"
                          className="pointer-events-none select-none"
                        >
                          {link.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Draw Nodes */}
                  {nodes.map(node => {
                    const isSelected = selectedNodeId === node.id;
                    const colors = getNodeColor(node);

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onClick={() => setSelectedNodeId(node.id)}
                        className="cursor-pointer transition-all hover:scale-105"
                      >
                        {/* Outer Ring for Selected */}
                        {isSelected && (
                          <circle
                            r="26"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="2.5"
                            strokeDasharray="4 2"
                            className="animate-spin"
                            style={{ animationDuration: '10s' }}
                          />
                        )}

                        {/* Node Circle */}
                        <circle
                          r="18"
                          fill={colors.fill}
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          opacity={isSelected ? 1 : 0.9}
                          className="shadow-md"
                        />

                        {/* Node Label */}
                        <text
                          y="32"
                          fill="#0f172a"
                          fontSize="11"
                          fontWeight={isSelected ? '700' : '600'}
                          textAnchor="middle"
                          className="pointer-events-none drop-shadow-xs select-none"
                        >
                          {node.label}
                        </text>

                        {/* Node Type Label */}
                        <text
                          y="43"
                          fill="#64748b"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="middle"
                          className="pointer-events-none uppercase tracking-wider select-none font-semibold"
                        >
                          {node.type}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Instructions Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                <span>Click any campus node to inspect connected facilities, utility routing, and records.</span>
                <span className="font-mono text-blue-700 font-bold">{nodes.length} Physical & Logical Entities Mapped</span>
              </div>
            </div>
          ) : (
            /* Accessible Table View */
            <div className="flex-1 overflow-x-auto p-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                    <th className="pb-3 font-semibold">Entity Label</th>
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Health Status</th>
                    <th className="pb-3 font-semibold">System Record ID</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredNodes.map(node => (
                    <tr
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${
                        selectedNodeId === node.id ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <td className="py-3 font-bold text-slate-900">
                        {node.label}
                      </td>
                      <td className="py-3 font-mono text-slate-600 capitalize">
                        {node.type}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize font-medium ${
                          node.status === 'alert'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : node.status === 'warning'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {node.status}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-slate-500 text-[11px]">
                        {node.sourceRecord}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedNodeId(node.id);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Inspect →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Node Inspector Drawer */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Infrastructure Deep Dive</h2>
              </div>
              <span className="text-[10px] font-mono text-slate-500">GIS Attribute Inspector</span>
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">{selectedNode.label}</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                      {selectedNode.type}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Source Registry:</span>
                    <span className="text-blue-700 font-bold">{selectedNode.sourceRecord}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Telemetry Timestamp:</span>
                    <span className="text-slate-700">{selectedNode.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Operational Health:</span>
                    <span className="text-amber-800 font-semibold capitalize">{selectedNode.status}</span>
                  </div>
                </div>

                {/* Connected Relationships */}
                <div>
                  <h3 className="font-bold text-slate-800 text-xs mb-2">
                    Topological Connections ({connectedLinks.length})
                  </h3>
                  <div className="space-y-2">
                    {connectedLinks.map((link, idx) => {
                      const otherNodeId = link.source === selectedNode.id ? link.target : link.source;
                      const otherNode = nodes.find(n => n.id === otherNodeId);
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => otherNode && setSelectedNodeId(otherNode.id)}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors space-y-1 focus:outline-hidden focus:ring-1 focus:ring-blue-500 shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-xs">
                              {link.label} → {otherNode?.label}
                            </span>
                            <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-semibold ${
                              link.nature === 'observed'
                                ? 'text-blue-700 bg-blue-50 border border-blue-200'
                                : link.nature === 'possible'
                                ? 'text-amber-800 bg-amber-50 border border-amber-200'
                                : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                            }`}>
                              {link.nature}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            {link.reason}
                          </p>
                          <div className="text-[10px] text-slate-400 font-mono pt-0.5">
                            Ref: {link.sourceRecord}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select an entity from the graph to inspect why connections exist.
              </div>
            )}
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => setCurrentSection('sati_map')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>View SATI 85-Acre Map & Photos</span>
            </button>
            <button
              onClick={() => setCurrentSection('simulator')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Simulate Contingency Impact for this Asset</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
