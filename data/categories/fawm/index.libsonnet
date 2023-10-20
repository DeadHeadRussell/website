local utils = import '../../utils.libsonnet';

utils.makeCategory('FAWM', [
  import './5090_2023.libsonnet',
  import './fawm_2023.libsonnet',
  import './fawm_2022.libsonnet',
  import './fawm_2021.libsonnet',
  import './5090_2020.libsonnet',
  import './fawm_2020.libsonnet',
  import './fawm_2019.libsonnet',
  import './fawm_2018.libsonnet',
  import './fawm_2017.libsonnet',
  import './fawm_2016.libsonnet',
  import './fawm_2015.libsonnet',
  import './fawm_2014.libsonnet'
])
