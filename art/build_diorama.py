"""Joe Town editorial diorama. Blender 5.2. No external textures/assets.
Run through execute_blender_code on the official Blender Lab MCP.
JOE_ART_DIR optionally overrides the local render working directory.
"""
import bpy, math, random, os
from mathutils import Vector
from pathlib import Path
random.seed(27)
OUT=Path(os.environ.get('JOE_ART_DIR',str(Path.cwd()/'work'/'joe-town-diorama')))
assert not (OUT/'joe-town-hero.blend').exists(), 'Choose a fresh JOE_ART_DIR; never overwrite the source model'
OUT.mkdir(parents=True,exist_ok=True)
scene=bpy.data.scenes.new('Joe Town • A little civilization')
bpy.context.window.scene=scene
scene.render.engine='BLENDER_EEVEE'
scene.world=bpy.data.worlds.new('Forest atmosphere');scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs[0].default_value=(.18,.25,.21,1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value=.4
scene.view_settings.view_transform='AgX'
scene.render.resolution_x=1440;scene.render.resolution_y=1080;scene.render.resolution_percentage=100
scene.render.fps=24;scene.frame_start=1;scene.frame_end=192
scene.render.image_settings.file_format='PNG';scene.render.film_transparent=True;scene.render.image_settings.color_mode='RGBA'
M={}
def mat(name,hex,rough=.65,metal=0,emission=0):
 h=hex.lstrip('#');sr=[int(h[i:i+2],16)/255 for i in (0,2,4)]
 rgb=[c/12.92 if c<=.04045 else ((c+.055)/1.055)**2.4 for c in sr]
 m=bpy.data.materials.new(name);m.diffuse_color=(*rgb,1);m.use_nodes=True;n=m.node_tree.nodes['Principled BSDF']
 n.inputs['Base Color'].default_value=(*rgb,1);n.inputs['Roughness'].default_value=rough;n.inputs['Metallic'].default_value=metal
 if emission:n.inputs['Emission Color'].default_value=(*rgb,1);n.inputs['Emission Strength'].default_value=emission
 M[name]=m;return m
for args in [('basalt','#344c48'),('stone','#79928a'),('grass','#617c51'),('edge','#425c45'),('paper','#e6d6a8'),('wall','#e2c690'),('roof','#a65337'),('rooflight','#c07049'),('wood','#6b4430'),('timber','#966944'),('teal','#63a9a2'),('road','#477c79'),('gold','#eebc5f'),('corn','#d5b75a'),('leaf','#748547'),('pine','#2d5745'),('sage','#50775b'),('white','#f2e8cc'),('comb','#ba4438'),('beak','#e1a342'),('eye','#172722'),('ground','#10251f')]:mat(*args)
mat('window','#ffcf76',.35,0,.7)
def material(o,m):o.data.materials.append(M[m]);return o
def box(name,loc,scale,m,bevel=.035,parent=None):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.name=name;o.dimensions=scale
 bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 material(o,m)
 if bevel:
  b=o.modifiers.new('Hand softened edges','BEVEL');b.width=bevel;b.segments=2
  o.modifiers.new('Corner normals','WEIGHTED_NORMAL')
 if parent:o.parent=parent
 return o
def uv(name,loc,scale,m,parent=None):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=8,radius=1,location=loc);o=bpy.context.object;o.name=name;o.scale=scale;material(o,m)
 for p in o.data.polygons:p.use_smooth=True
 if parent:o.parent=parent
 return o
def cyl(name,loc,r,depth,m,verts=16,rot=None,parent=None):
 bpy.ops.mesh.primitive_cylinder_add(vertices=verts,radius=r,depth=depth,location=loc);o=bpy.context.object;o.name=name;material(o,m)
 if rot:o.rotation_euler=rot
 if parent:o.parent=parent
 b=o.modifiers.new('Edge glints','BEVEL');b.width=.02;b.segments=2;o.modifiers.new('Normals','WEIGHTED_NORMAL')
 return o
def empty(name,loc=(0,0,0)):
 o=bpy.data.objects.new(name,None);scene.collection.objects.link(o);o.location=loc;return o
def mesh(name,vs,fs,m):
 me=bpy.data.meshes.new(name);me.from_pydata(vs,[],fs);me.update();o=bpy.data.objects.new(name,me);scene.collection.objects.link(o);material(o,m);return o
# Layered, chiseled plateau. Footprint clipped corners, organic rock strata.
outline=[(-4.5,-3.3),(-3.8,-4),(3.5,-4),(4.5,-3.1),(4.5,2.8),(3.6,3.7),(-3.5,3.7),(-4.5,2.6)]
for n,(z0,z1,factor,ma) in enumerate([(-1.5,-.9,.80,'basalt'),(-.9,-.3,.96,'basalt'),(-.3,.04,1,'stone'),(.04,.18,1,'edge')]):
 bottom=[(x*factor*.95,y*factor*.95,z0) for x,y in outline];top=[(x*factor,y*factor,z1) for x,y in outline]
 fs=[tuple(range(7,-1,-1)),tuple(range(8,16))]+[(i,(i+1)%8,(i+1)%8+8,i+8) for i in range(8)]
 o=mesh('Carved plateau layer '+str(n),bottom+top,fs,ma);b=o.modifiers.new('Worn strata','BEVEL');b.width=.08;b.segments=2;o.modifiers.new('Normals','WEIGHTED_NORMAL')
# Paved lawn tiles, roads form a civic cross and production loop.
for x in range(-4,5):
 for y in range(-3,4):
  if abs(x)==4 and abs(y)==3:continue
  road=(x==0 or y==-1)
  box('Connected road' if road else 'Town plot',(x,y,.21),(.97,.97,.12),'road' if road else 'grass',.04)
  if road:
   for k in [-.28,0,.28]:box('Paving seam',(x+k,y,.278),(.012,.84,.006),'teal',0)
# Edge retaining stone seams and mineral flecks.
for i in range(24):
 x=random.uniform(-3.4,3.3);box('Basalt strata',(x,-3.6,-.56-random.random()*.5),(.28+random.random()*.4,.17,.12),'stone',.035)
def roof(name,x,y,z,w,d,h,ma='roof'):
 vs=[(x-w/2,y-d/2,z),(x+w/2,y-d/2,z),(x,y-d/2,z+h),(x-w/2,y+d/2,z),(x+w/2,y+d/2,z),(x,y+d/2,z+h)]
 o=mesh(name,vs,[(0,1,2),(5,4,3),(0,3,4,1),(0,2,5,3),(2,1,4,5)],ma);b=o.modifiers.new('Roof edges','BEVEL');b.width=.045;b.segments=2;o.modifiers.new('Normals','WEIGHTED_NORMAL');return o
def house(name,x,y,w=1.3,d=1.15,h=1.2):
 base=.30
 box(name+' foundation',(x,y,base+.11),(w+.16,d+.16,.22),'stone')
 box(name+' plaster',(x,y,base+.2+h/2),(w,d,h),'wall')
 for dx in [-w/2+.05,w/2-.05]:box(name+' timber upright',(x+dx,y-d/2-.018,base+.2+h/2),(.085,.08,h),'wood',.015)
 box(name+' beam',(x,y-d/2-.035,base+.2+h-.1),(w,.10,.1),'wood',.015)
 box(name+' door',(x,y-d/2-.046,base+.51),(.35,.045,.64),'wood',.025)
 uv('Brass door latch',(x+.1,y-d/2-.08,base+.49),(.03,.02,.03),'gold')
 for dx in [-.4,.4]:
  box(name+' lit window',(x+dx,y-d/2-.057,base+.94),(.22,.035,.3),'window',.015)
  box('Window mullion',(x+dx,y-d/2-.08,base+.94),(.025,.025,.32),'timber',0)
 roof(name+' terracotta roof',x,y,base+.2+h,w+.28,d+.27,.63)
 for side in [-1,1]:
  for j in range(1,5):
   dx=side*(w+.28)/2*j/5; zz=base+.2+h+.63*(1-j/5)+.017
   bar=box('Raised roof tile course',(x+dx,y,zz),(.045,d+.28,.045),'rooflight',.008)
 box(name+' ridge cap',(x,y,base+.2+h+.65),(.15,d+.34,.12),'rooflight',.04)
 box(name+' chimney',(x+.35,y+.21,base+.2+h+.52),(.24,.28,.62),'stone',.03)
 return base+.2+h+.68
# Civic hall: distinctive heraldic crown, paired banners, steps.
x,y=0,1.9
box('Hall terrace',(x,y,.40),(2.25,1.95,.27),'stone')
box('Civic Hall',(x,y,1.43),(1.9,1.55,1.85),'wall',.055)
roof('Civic Hall teal roof',x,y,2.39,2.17,1.9,.85,'sage')
for xx in [-.82,.82]:
 box('Hall column',(xx,y-.82,1.38),(.18,.23,1.8),'paper')
 box('Wheat gold banner',(xx,y-.96,1.75),(.31,.035,.75),'gold',.015)
 box('Banner forest inset',(xx,y-.984,1.82),(.13,.015,.45),'pine',.01)
box('Hall double door',(0,y-.8,1.0),(.6,.05,1.06),'wood')
box('Hall clerestory',(0,y-.84,2.0),(.62,.04,.35),'window')
for j in range(3):box('Civic steps',(0,.76-j*.18,.28+j*.06),(1.05,.25,.12),'paper')
# Crown on a small masonry plinth, open ring with five gold points.
cyl('Crown plinth',(0,1.9,3.23),.3,.15,'stone')
cyl('Crown band',(0,1.9,3.4),.34,.24,'gold')
for i in range(5):
 a=math.tau*i/5
 bpy.ops.mesh.primitive_cone_add(vertices=4,radius1=.13,radius2=.03,depth=.36,location=(.27*math.cos(a),1.9+.27*math.sin(a),3.64));material(bpy.context.object,'gold')
 uv('Crown pearl',(.27*math.cos(a),1.9+.27*math.sin(a),3.83),(.06,.06,.06),'gold')
house('Bakery',2.55,1.75,1.4,1.3,1.3)
house('Founders cottage',2.6,.1,1.3,1.15,.85)
house('Mill',-2.65,1.7,1.35,1.35,1.5)
# Oversized working wheel on visible mill facade.
wheel=empty('Mill wheel • looping',(-2.65,.88,1.34))
cyl('Wheel rim',(0,0,0),.72,.13,'wood',32,(math.pi/2,0,0),wheel)
cyl('Wheel inset',(0,-.075,0),.57,.14,'timber',32,(math.pi/2,0,0),wheel)
cyl('Wheel hub',(0,-.17,0),.13,.2,'gold',16,(math.pi/2,0,0),wheel)
for i in range(12):
 a=i*math.tau/12
 o=box('Wheel spoke',(math.sin(a)*.34,-.17,math.cos(a)*.34),(.085,.10,.6),'wood',.015,wheel);o.rotation_euler[1]=a
 o=box('Wheel paddle',(math.sin(a)*.74,0,math.cos(a)*.74),(.23,.38,.12),'timber',.02,wheel);o.rotation_euler[1]=a
wheel.rotation_euler[1]=0;wheel.keyframe_insert('rotation_euler',frame=1,index=1)
wheel.rotation_euler[1]=math.tau;wheel.keyframe_insert('rotation_euler',frame=193,index=1)
# Grain sacks and delivery crates.
for xx,yy in [(-1.8,.6),(-1.55,.5),(1.6,.65)]:
 uv('Grain sack',(xx,yy,.56),(.18,.15,.3),'paper');cyl('Sack tie',(xx,yy,.83),.08,.05,'timber')
for xx,yy in [(3.4,.65),(3.2,.73)]:
 box('Market crate',(xx,yy,.52),(.38,.34,.4),'timber')
 for a in [-.11,.11]:box('Crate slat',(xx+a,yy-.18,.52),(.027,.025,.39),'wood',0)
# A tended corn plot, orderly rows and fence.
box('Corn bed',(2.55,-2.53,.34),(2.9,1.77,.19),'wood',.06)
for row in range(4):
 yy=-3.13+row*.4
 box('Furrow',(2.55,yy,.45),(2.72,.18,.10),'timber',.03)
 for col in range(7):
  xx=1.4+col*.38;hh=.34+random.random()*.14
  cyl('Corn stem',(xx,yy,.5+hh/2),.021,hh,'leaf',6)
  for side in [-1,1]:
   leaf=uv('Corn leaf',(xx+side*.07,yy,.58+hh*.2),(.11,.035,.045),'leaf');leaf.rotation_euler[1]=side*.5
  uv('Golden corn',(xx,yy,.5+hh),(.045,.045,.12),'corn')
for xx in [1.02,2.05,3.1,4.05]:box('Farm fence post',(xx,-3.55,.60),(.095,.095,.65),'paper')
for zz in [.51,.74]:box('Farm fence rail',(2.54,-3.55,zz),(3.12,.065,.065),'timber',.01)
# Trees and rocks define the plateau silhouette.
def tree(x,y,s=1):
 cyl('Tree trunk',(x,y,.3+.45*s),.085*s,.9*s,'wood')
 for z,r in [(.7,.48),(1.04,.40),(1.37,.29)]:
  bpy.ops.mesh.primitive_cone_add(vertices=7,radius1=r*s,radius2=.045*s,depth=.75*s,location=(x,y,.3+z*s));material(bpy.context.object,'pine' if z<1 else 'sage')
for t in [(-3.9,2.6,.95),(-3.7,-2.7,.8),(-3.1,-3.15,.58),(3.85,2.9,.8),(1.6,3.1,.5),(-1.6,3.05,.65)]:tree(*t)
for xx,yy in [(-4,-2.4),(-3.5,-3.2),(3.95,3.1),(-3.8,3.0)]:
 bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1,radius=.25,location=(xx,yy,.37));o=bpy.context.object;o.scale=(1.3,.9,.6);material(o,'stone')
# Lanterns along the roads.
for xx,yy in [(-.56,-3.35),(.65,.0),(-1.6,-.52),(3.7,-.52)]:
 cyl('Lantern stem',(xx,yy,.69),.035,.84,'wood')
 box('Amber lantern',(xx,yy,1.12),(.16,.16,.24),'window',.02)
 roof('Lantern cap',xx,yy,1.24,.25,.25,.11,'wood')
# Sculpted chickens: cream bodies, scarlet combs, golden beaks and feet.
def chicken(name,x,y,s=1,angle=0):
 root=empty(name,(x,y,.31));root.rotation_euler[2]=angle;root.scale=(s,s,s)
 uv(name+' body',(0,0,.37),(.29,.36,.31),'white',root)
 uv(name+' head',(0,-.25,.68),(.235,.22,.25),'white',root)
 for xx in [-.23,.23]:uv('Layered wing',(xx,.015,.39),(.10,.22,.16),'paper',root)
 for xx in [-.085,0,.085]:uv('Scarlet comb',(xx,-.22,.925),(.065,.09,.12 if xx==0 else .085),'comb',root)
 uv('Wattle',(0,-.443,.57),(.068,.06,.1),'comb',root)
 bpy.ops.mesh.primitive_cone_add(vertices=4,radius1=.115,radius2=0,depth=.22,location=(0,-.51,.70));o=bpy.context.object;o.rotation_euler=(math.pi/2,0,0);material(o,'beak');o.parent=root
 for xx in [-.155,.155]:uv('Bright eye',(xx,-.407,.755),(.038,.03,.043),'eye',root);uv('Eye glint',(xx-.008,-.433,.769),(.010,.008,.012),'white',root)
 for xx in [-.13,.13]:
  cyl('Golden leg',(xx,0,.11),.027,.18,'beak',8,parent=root)
  for dx in [-.035,.035]:box('Chicken toe',(xx+dx,-.065,.035),(.026,.16,.03),'beak',.009,root)
 for xx in [-.1,0,.1]:
  tail=uv('Tail feather',(xx,.35,.58),(.08,.11,.22),'white',root);tail.rotation_euler[0]=-.5
 return root
chickens=[chicken('Joe • bakery run',-.7,-2.15,1.1,-.22),chicken('Joe • corn inspector',1.0,-2.0,.72,.5),chicken('Joe • mill delivery',-2.3,-.92,.65,-.7),chicken('Joe • town hall',.05,.3,.6,2.2),chicken('Joe • little neighbor',-1.75,-2.8,.8,.7)]
for i,o in enumerate(chickens):
 base=o.location.copy();rot=o.rotation_euler.copy()
 for frame in range(1,194,4):
  t=(frame-1)/192*math.tau; phase=t+i*1.2
  o.location=base+Vector((.10*math.sin(phase),.13*math.sin(phase),.014*math.sin(4*t+i)))
  o.rotation_euler=(.05*math.sin(2*t+i),.028*math.sin(4*t+i),rot.z+.10*math.sin(t+i))
  o.keyframe_insert('location',frame=frame);o.keyframe_insert('rotation_euler',frame=frame)
# Camera breathes through an exact closed cycle.
bpy.ops.object.camera_add(location=(12,-17,13));cam=bpy.context.object;cam.name='Editorial camera';cam.data.type='ORTHO';cam.data.ortho_scale=14.8;scene.camera=cam
for frame in range(1,194,4):
 t=(frame-1)/192*math.tau;theta=.026*math.sin(t);x=12*math.cos(theta)+17*math.sin(theta);y=12*math.sin(theta)-17*math.cos(theta)
 cam.location=(x,y,13+.13*math.sin(t));cam.rotation_euler=(Vector((0,0,1.0))-cam.location).to_track_quat('-Z','Y').to_euler();cam.keyframe_insert('location',frame=frame);cam.keyframe_insert('rotation_euler',frame=frame)
# Exact linear sampling, so frame 193 equals frame 1 but is not encoded twice.
for ob in list(chickens)+[cam,wheel]:
 if ob.animation_data and ob.animation_data.action:
  for layer in ob.animation_data.action.layers:
   for strip in layer.strips:
    for cb in strip.channelbags:
     for fc in cb.fcurves:
      for kp in fc.keyframe_points:kp.interpolation='LINEAR'
# Match the website forest background and soft studio light.
box('Forest backdrop',(0,0,-1.9),(200,200,.1),'ground',0).hide_render=True
for name,loc,energy,size,color in [('Warm morning',(-6,-8,14),1800,9,(1,.86,.64)),('Sage fill',(8,-2,9),1200,8,(.75,.88,1)),('Golden rim',(0,7,10),2200,7,(1,.83,.52))]:
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.name=name;o.data.energy=energy;o.data.shape='DISK';o.data.size=size;o.data.color=color;o.rotation_euler=(Vector((0,0,0))-o.location).to_track_quat('-Z','Y').to_euler()
scene.frame_set(1)
scene.render.filepath=str(OUT/'poster.png')
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'joe-town-hero.blend'))
bpy.ops.render.render(write_still=True)
result={'scene':scene.name,'objects':len(scene.objects),'blend':bpy.data.filepath,'preview':scene.render.filepath,'frames':192,'seconds':8}
